#!/usr/bin/env python3
"""Parse the printed wine list PDF into structured sections (tools/parse-wine-list.py).

Fonts in the PDF: Tenebras 16 = section title, Tenebras 11 = subsection,
ApocRevelations 9 = wine name + price, NHaas Grotesk 8.2 = grapes / region.
Columns are found from vertical gaps in the text. Output: JSON on stdout.
Usage: python3 tools/parse-wine-list.py "Damas Website Example/Menus/FR/vins.pdf"
"""
import json, re, sys
import pdfplumber

def kind(w):
    f, s = w['fontname'], w['size']
    if 'Tenebras' in f: return 'H' if s > 13 else 'SH'
    if 'Apoc' in f: return 'N'
    if 'NHaas' in f and 'It' in f: return 'NOTE'
    return 'D'

def columns(page):
    occ = [0] * (int(page.width) + 1)
    for c in page.chars:
        for x in range(int(c['x0']), int(c['x1']) + 1): occ[min(x, len(occ) - 1)] = 1
    cols, start, gap = [], None, 0
    for x, v in enumerate(occ):
        if v:
            if start is None: start = x
            gap = 0
        elif start is not None:
            gap += 1
            if gap > 14: cols.append((start, x - gap)); start, gap = None, 0
    if start is not None: cols.append((start, len(occ) - 1))
    return cols

def lines_in(page, x0, x1):
    words = page.crop((max(0, x0 - 2), 0, min(page.width, x1 + 2), page.height)).extract_words(extra_attrs=['fontname', 'size'], keep_blank_chars=False, use_text_flow=True)
    rows = []
    for w in sorted(words, key=lambda w: (round(w['top']), w['x0'])):
        k = kind(w)
        if rows and abs(rows[-1]['top'] - w['top']) < 2.5 and rows[-1]['kind'] == k:
            rows[-1]['words'].append(w)
        else:
            rows.append({'top': w['top'], 'kind': k, 'words': [w]})
    for r in rows:
        r['words'].sort(key=lambda w: w['x0'])
        r['text'] = ' '.join(w['text'] for w in r['words'])
    return rows

def parse(path):
    out, section, sub = [], None, None
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            for (x0, x1) in columns(page):
                item = None
                for r in lines_in(page, x0, x1):
                    t = r['text'].strip()
                    if not t or t in ('•',): continue
                    if r['kind'] == 'H':
                        section = {'title': t, 'subs': []}; out.append(section); sub = None; item = None
                        continue
                    if r['kind'] == 'SH':
                        if section is None: section = {'title': '', 'subs': []}; out.append(section)
                        sub = {'title': t, 'items': []}; section['subs'].append(sub); item = None
                        continue
                    if section is None: continue
                    if sub is None: sub = {'title': '', 'items': []}; section['subs'].append(sub)
                    if r['kind'] == 'N':
                        m = re.match(r'^(.*?)\s+(\d{1,4})$', t)
                        # rows with several name/price pairs (arak grid)
                        pairs = re.findall(r'([^\d]+?)\s+(\d{1,4})(?=\s|$)', t)
                        if len(pairs) > 1:
                            for n, p in pairs: sub['items'].append({'name': n.strip(), 'price': p, 'desc': ''})
                            item = None
                        elif m:
                            item = {'name': m.group(1).strip(), 'price': m.group(2), 'desc': ''}; sub['items'].append(item)
                        elif item and not item['desc']:
                            item['name'] += ' ' + t  # wrapped name
                        else:
                            item = {'name': t, 'price': '', 'desc': ''}; sub['items'].append(item)
                    elif r['kind'] == 'D' and item is not None:
                        item['desc'] = (item['desc'] + ' ' + t).strip()
    return out

if __name__ == '__main__':
    print(json.dumps(parse(sys.argv[1]), ensure_ascii=False, indent=1))
