from pathlib import Path
import os
import subprocess

root = Path(r"d:\SheCanCode\rscn-frontend")
os.chdir(root)
status = subprocess.check_output(["git", "status", "--porcelain"], text=True).splitlines()
if not status:
    print('no changes')
    raise SystemExit(0)

for line in status:
    if not line or len(line) < 4:
        continue
    code = line[:2]
    path = line[3:]
    if not path:
        continue
    # Normalize path separators for git and filesystem
    path = path.replace("/", os.sep)
    path_obj = root / path
    if code == '??':
        # Stage new file or directory file by file
        if path_obj.is_dir():
            for p in sorted(path_obj.rglob('*')):
                if p.is_file():
                    rel = p.relative_to(root)
                    subprocess.check_call(["git", "add", str(rel)])
                    subprocess.check_call(["git", "commit", "-m", f"Add {rel}"])
                    print(f"committed {rel}")
        else:
            subprocess.check_call(["git", "add", str(path_obj)])
            subprocess.check_call(["git", "commit", "-m", f"Add {path}"])
            print(f"committed {path}")
    elif 'D' in code:
        subprocess.check_call(["git", "rm", "--quiet", str(path_obj)])
        subprocess.check_call(["git", "commit", "-m", f"Delete {path}"])
        print(f"committed delete {path}")
    else:
        subprocess.check_call(["git", "add", str(path_obj)])
        subprocess.check_call(["git", "commit", "-m", f"Update {path}"])
        print(f"committed {path}")
