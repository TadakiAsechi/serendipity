
転職活動始めたので、ポートフォリオ的なものを作ろうと思いプロジェクトを作りました。
特に何を実装するかは考えていません。思いついたまま作ろうと思います。

S3でマスターを自動デプロイしてます。
https://localhost-8000.com

構成（今はクライアントだけ）
        
User ----→ route53 & ACM 
                ↓
            CroudFront
                ↓
User --- x ---  S3
                ↑
             github action
                |
              github