# SpecialAigent

**戦国時代の軍制をモチーフにしたAIエージェントシステム（教員業務特化版）**

```
        上様（人間）
          ↓ 「やれ」
        将軍（Claude Code）
          ↓ 「家老、タスクを分解せよ」
        家老（Claude Code）
          ↓ 「足軽ども、並列で実行せよ」
       ┌──┬──┬──┐
       │0 │1 │2 │ ← 3人同時に動く
       └──┴──┴──┘
       足軽（Claude Code × 3）
```

One human. One command. Three agents.

## 特徴

- **戦国口調で報告** - 「承知つかまつった！」「任務完了でござる！」
- **自動ペルソナ設定** - タスク内容に応じて足軽の専門性が変わる
- **YAMLベース通信** - エージェント間の通信はすべてYAML
- **リアルタイムダッシュボード** - VSCodeのMarkdownプレビューで進捗確認
- **Skill自動提案** - 繰り返し作業を検知してSkill化を提案
- **Proプラン対応** - API消費を最小限に抑える設計（足軽3体 + Haiku活用）

## 対応業務

| 業務 | 自動ペルソナ | できること |
|------|-------------|-----------|
| 英語教材作成 | ベテラン英語教師 | テスト・ワークシート・指導案の作成 |
| 進路指導 | 進路指導カウンセラー | 志望理由書添削・進路だより・大学調査 |
| 校務文書 | テクニカルライター | 通知文・報告書・議事録の作成 |
| ネットワーク管理 | ネットワークエンジニア | トラブルシュート・マニュアル・設定生成 |
| 校内DX | DX推進スペシャリスト | 業務改善提案・自動化スクリプト作成 |

## セットアップ

### 必要なもの

- **tmux** - ターミナルマルチプレクサ
- **bash** - シェル（Git Bash / WSL / macOS標準）
- **Claude Code CLI**（推奨）- `npm install -g @anthropic-ai/claude-code`

### インストール

```bash
# 1. リポジトリをクローン
git clone <このリポジトリのURL>
cd SpecialAigent

# 2. セットアップ実行
bash setup.sh

# 3. tmuxセッションに参陣
tmux attach -t multiagent
```

### Windows（WSL）の場合

```bash
# WSL2のUbuntuで実行
sudo apt update && sudo apt install tmux
bash setup.sh
tmux attach -t multiagent
```

## 使い方

### 基本操作

将軍ウィンドウ（Ctrl+b → 0）で自然言語でコマンドを入力するだけ。

```
上様> 英語のテストを作って（範囲：関係代名詞、難易度：標準）
上様> 11月号の進路だよりを作成せよ
上様> 3階のWi-Fiが繋がらない原因を調べよ
上様> 出欠管理のDX化を提案せよ
```

### tmuxウィンドウ操作

| キー | 操作 |
|------|------|
| `Ctrl+b → 0` | 将軍ウィンドウ（コマンド入力） |
| `Ctrl+b → 1` | 家老ウィンドウ（ダッシュボード監視） |
| `Ctrl+b → 2` | 足軽ウィンドウ（並列実行状況） |
| `Ctrl+b → d` | セッションから離脱 |

### ダッシュボード

`status/dashboard.md` をVSCodeのMarkdownプレビュー（`Ctrl+Shift+V`）で開くと、リアルタイムで進捗が確認できる。

### 特殊コマンド

| コマンド | 説明 |
|----------|------|
| `状況` / `status` | 全タスクの状態を表示 |
| `クリア` / `clear` | タスクキューをクリア |
| `退陣` / `exit` | 将軍を終了 |

## ディレクトリ構成

```
SpecialAigent/
├── CLAUDE.md              # Claude Code設定
├── README.md              # このファイル
├── setup.sh               # セットアップスクリプト
├── config/
│   ├── personas.yaml      # ペルソナ定義
│   ├── settings.yaml      # システム設定
│   └── commands.yaml      # コマンド定義
├── scripts/
│   ├── shogun.sh          # 将軍スクリプト
│   ├── karo.sh            # 家老スクリプト
│   ├── ashigaru.sh        # 足軽スクリプト
│   ├── task_manager.sh    # タスクキュー管理
│   └── dashboard.sh       # ダッシュボード更新
├── skills/
│   ├── english_teacher/   # 英語教材スキル
│   ├── career_guidance/   # 進路指導スキル
│   ├── school_docs/       # 校務文書スキル
│   ├── network_admin/     # ネットワーク管理スキル
│   └── school_dx/         # 校内DXスキル
├── templates/
│   ├── test_template.md   # テストテンプレート
│   ├── lesson_plan.md     # 指導案テンプレート
│   └── report_template.md # 報告書テンプレート
├── queue/
│   ├── tasks/             # タスクキュー
│   └── results/           # 実行結果
├── status/
│   └── dashboard.md       # リアルタイムダッシュボード
├── output/                # 生成された成果物
└── logs/                  # 活動ログ
```

## API消費を抑える工夫（Proプラン対応）

1. **足軽3体制限** - 元の8体から3体に削減
2. **Haikuモデル活用** - 足軽・家老にはコスト効率の良いHaikuを使用
3. **キャッシュ機能** - 同一タスクの結果を24時間キャッシュ
4. **段階実行** - まず1体で試行、成功したら残りを並列実行
5. **バッチ処理** - 類似タスクをまとめて処理

## Skill自動提案

同じ種類のタスクを3回実行すると、将軍がSkill化を提案する。
承認すると `skills/` フォルダに自動保存され、次回からワンコマンドで実行可能。
