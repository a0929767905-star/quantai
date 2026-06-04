# QuantAI 台股智能分析平台

## 🚀 部署到 Vercel（5分鐘完成）

### 步驟一：上傳到 GitHub
1. 前往 https://github.com/new 建立新 repo，名稱填 `quantai`
2. 把這個資料夾的檔案全部上傳（拖曳到網頁）

### 步驟二：部署到 Vercel
1. 前往 https://vercel.com → 用 GitHub 登入
2. 點 **Add New → Project**
3. 選剛才建立的 `quantai` repo → 點 **Deploy**

### 步驟三：設定 API Key
1. 部署完成後，進入 Vercel 專案頁面
2. 點上方 **Settings → Environment Variables**
3. 新增：
   - Name: `ANTHROPIC_API_KEY`
   - Value: 你的 Anthropic API Key（從 https://console.anthropic.com 取得）
4. 點 **Save** → 回到 **Deployments** → 點 **Redeploy**

### 完成！
你會得到一個 `https://quantai-xxx.vercel.app` 的公開網址

## 功能
- ✅ Yahoo Finance 即時股價（延遲15分鐘）
- ✅ Claude AI 深度分析（串流輸出）
- ✅ TradingView K線嵌入
- ✅ 法人籌碼分析
- ✅ AI技術面/基本面/綜合評分
- ✅ 每60秒自動更新行情
