# SESSION CONTEXT — Eden Residential Reports
> Lưu ngày: 24/04/2026 — Dùng để tiếp nối từ máy khác

---

## MỤC TIÊU DỰ ÁN

Tạo và deploy 4 báo cáo HTML lên GitHub Pages cho dự án Eden Residential:
- `PRE_FS_EDEN_OG.html` — Pre-FS kịch bản quy hoạch gốc
- `PRE_FS_EDEN_V1.html` — Pre-FS kịch bản V1 (điều chỉnh quy hoạch, hệ số 8×, ~21 tầng)
- `EXECUTIVE_SUMMARY_OG.html` — Executive Summary kịch bản gốc
- `EXECUTIVE_SUMMARY_V1.html` — Executive Summary kịch bản V1

**Workflow tuyệt đối:** `Pre-FS MD → ES MD → Pre-FS HTML → ES HTML` (không xử lý MD và HTML cùng lúc)

---

## CẤU TRÚC FILE

```
D:\Eden\
  md\
    PRE_FS_EDEN_OG.md       ✅ DONE — không sửa
    PRE_FS_EDEN_V1.md       ✅ DONE — không sửa
    EXECUTIVE_SUMMARY_OG.md ✅ DONE — không sửa
    EXECUTIVE_SUMMARY_V1.md ✅ DONE — không sửa
  html\
    PRE_FS_EDEN_OG.html     ✅ DONE — không sửa
    PRE_FS_EDEN_V1.html     ✅ DONE — không sửa
    EXECUTIVE_SUMMARY_OG.html ✅ DONE — không sửa
    EXECUTIVE_SUMMARY_V1.html ✅ DONE — không sửa
  image\
    EXECUTIVE_SUMMARY\
      1776956378875.png
      1776956420149.png
      qd_1500_p1.png
      qr_es_og.png
      qr_es_v1.png
  scripts\
    validate_html.py
  .venv\Scripts\python.exe  ← Python venv

D:\VsCode\
  eden-reports\             ← Git repo chính (main branch)
    public\                 ← Copy HTML files vào đây trước khi build
    .github\workflows\deploy.yml ← GA deploy to gh-pages
  gh-pages-deploy\          ← Git worktree on gh-pages branch
```

---

## REPO & DEPLOYMENT

- **Repo chính:** https://github.com/Khogao/eden-reports
- **Live site (repo chính):** https://khogao.github.io/eden-reports/ ← CDN cache lag, dùng repo-2
- **Repo backup:** https://github.com/Khogao/eden-reports-2
- **Live site (backup):** https://khogao.github.io/eden-reports-2/ ← DÙNG CÁI NÀY

### URLs các file:
- https://khogao.github.io/eden-reports-2/EXECUTIVE_SUMMARY_OG.html
- https://khogao.github.io/eden-reports-2/EXECUTIVE_SUMMARY_V1.html
- https://khogao.github.io/eden-reports-2/PRE_FS_EDEN_OG.html
- https://khogao.github.io/eden-reports-2/PRE_FS_EDEN_V1.html

---

## PUSH SEQUENCE CHUẨN

```powershell
$env:PYTHONIOENCODING="utf-8"
& d:\Eden\.venv\Scripts\python.exe D:\Eden\scripts\validate_html.py
Copy-Item "D:\Eden\html\*.html" "D:\VsCode\eden-reports\public\" -Force
Set-Location "D:\VsCode\eden-reports"
git add -A
git commit -m "<message>"
git push origin main
# Sau khi GA deploy xong (~2 phút), cũng push lên eden-reports-2:
$tok = (("protocol=https`nhost=github.com`n" | git credential fill) | Where-Object { $_ -match "^password=" }) -replace "^password=",""
git -C "D:\VsCode\gh-pages-deploy" push "https://Khogao:$tok@github.com/Khogao/eden-reports-2.git" "gh-pages:main" --force
```

---

## TRẠNG THÁI HIỆN TẠI (24/04/2026)

### ✅ Tất cả 4 file HTML đã đúng và deployed lên eden-reports-2

| Kiểm tra | OG | V1 |
|---|---|---|
| Chủ đầu tư = `[Bảo mật]` | ✅ | ✅ |
| Biên độ giá Phú Cường đã xóa | ✅ | ✅ |
| TMDV = 1,25×CH | ✅ | ✅ |
| V1 TP = 60% | ✅ | ✅ |
| Image paths = `image/` (không có `../`) | ✅ | ✅ |

### Commit history (gh-pages):
```
7102c93 — current HEAD (gh-pages & eden-reports-2/main)
8aa1e6d — chore: force CDN purge
f5b90c9 — chore: force CDN purge all HTML files
043b37b — fix: remove land price sensitivity note
7a8bb46 — fix: V1+OG TMDV=1.25xCH, V1 TP=60%
```

---

## SỐ LIỆU CỐT LÕI

### Kịch bản OG (PA B — giá đất 13 tr/m²):
- DT = 7.823 tỷ
- EBIT = 2.094 tỷ (26,8%)
- LNST ≈ 1.275 tỷ (16,3%)

### Kịch bản V1 (PA B):
- DT = 14.951 tỷ
- EBIT = 6.305 tỷ (42,2%)
- Lãi vay ≈ 850 tỷ
- LNST ≈ 4.364 tỷ (29,2%)

### Công thức:
- TMDV = 1,25×CH; VP = 0,80×CH
- OG: CH TP=75%; TMDV TP=65%; VP TP=65%
- V1: CH TP=75%; TMDV TP=60%
- LNST = (EBIT − lãi vay) × 0,80 (sau 20% TNDN)
- Tỷ suất = LNST / Doanh thu

### Số căn (cả OG và V1):
- Biệt thự: 76 căn (19.365,5 m² đất)
- Nhà liên kế: 24 căn (2.934 m² đất)

---

## VẤN ĐỀ ĐÃ GIẢI QUYẾT

1. **CDN cache lag** → Tạo repo eden-reports-2 làm backup, images 200 OK
2. **Image path sai** (`../image/` → `image/`) → Đã fix trong tất cả HTML files
3. **Biên độ giá Phú Cường** → Đã xóa khỏi PRE_FS_EDEN_V1 (cả md lẫn html)
4. **Chủ đầu tư** → Đã thay bằng `[Bảo mật]` trong tất cả files

---

## LƯU Ý KỸ THUẬT

- PowerShell `Select-String -SimpleMatch` KHÔNG match được tiếng Việt Unicode
- Dùng `Where-Object { $_ -match "regex" }` hoặc `git show` thay thế
- `dist/` bị .gitignored — GA Actions build từ `src/` + `public/`
- `D:\VsCode\gh-pages-deploy` là git worktree của gh-pages branch
- Python venv: `d:\Eden\.venv\Scripts\python.exe`

---

## ĐỂ TIẾP NỐI TỪ MÁY KHÁC

1. Clone/pull repo `eden-reports` về máy mới
2. Đọc file này (`SESSION_CONTEXT.md`)
3. Paste nội dung file này vào đầu chat mới với Copilot
4. Tiếp tục từ bước tiếp theo
