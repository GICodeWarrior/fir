import json
import sys


FILE = sys.argv[1]

contents = None

with open(FILE, 'r', encoding='utf-8') as f:
  contents = json.loads(f.read())

with open(FILE, 'w', encoding='utf-8') as f:
  f.write(json.dumps(contents, indent=2, sort_keys=True));
  f.write('\n');
