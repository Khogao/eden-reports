# ============================================================
# Chạy script này 1 lần để tạo private repo và push lên GitHub
# Yêu cầu: GitHub CLI đã cài (https://cli.github.com/)
# ============================================================

# Bước 1: Đăng nhập GitHub CLI (bỏ qua nếu đã login rồi)
# gh auth login

Set-Location "D:\VsCode\eden-reports"

# ---- ĐIỀN THÔNG TIN CỦA BẠN VÀO ĐÂY ----
$GITHUB_USERNAME = "Khogao"
$REPO_NAME       = "eden-reports"
# ------------------------------------------

# Bước 2: Tạo private repo trên GitHub
gh repo create "$REPO_NAME" --private --source . --remote origin --push

# Nếu repo đã tồn tại, dùng lệnh thủ công thay thế:
# git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
# git branch -M main
# git push -u origin main

Write-Host ""
Write-Host "✅ Xong! Repo tại: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
Write-Host ""
Write-Host "⚙️  Bước tiếp theo — kích hoạt GitHub Pages:"
Write-Host "   1. Vào repo → Settings → Pages"
Write-Host "   2. Source: Deploy from a branch"
Write-Host "   3. Branch: gh-pages / (root)"
Write-Host "   4. Save → đợi ~2 phút → site live tại:"
Write-Host "      https://$GITHUB_USERNAME.github.io/$REPO_NAME/"
Write-Host ""
Write-Host "   Hoặc dùng GitHub Actions (đã setup sẵn trong .github/workflows/deploy.yml)"
Write-Host "   → tự động build và deploy mỗi khi push lên main."
