import { useState } from 'react'
import './App.css'

const BASE = import.meta.env.BASE_URL

const reports = [
  {
    id: 'es-v1',
    tag: 'KỊCH BẢN V1',
    tagClass: 'tag-v1',
    title: 'Tóm Tắt Đầu Tư',
    subtitle: 'CT10 hệ số 8× — ~2.011 căn hộ, ~21 tầng',
    file: 'EXECUTIVE_SUMMARY_V1.html',
    stats: [
      { label: 'Doanh thu', value: '14.886 tỷ' },
      { label: 'EBIT PA B', value: '42,0%' },
      { label: 'LNST PA B', value: '~4.317 tỷ' },
    ],
    accent: 'teal',
  },
  {
    id: 'es-og',
    tag: 'KỊCH BẢN OG',
    tagClass: 'tag-og',
    title: 'Tóm Tắt Đầu Tư',
    subtitle: 'QH gốc 15 tầng — ~376 căn hộ + TMDV Lô C',
    file: 'EXECUTIVE_SUMMARY_OG.html',
    stats: [
      { label: 'Doanh thu', value: '9.025 tỷ' },
      { label: 'EBIT PA B', value: '29,8%' },
      { label: 'LNST PA B', value: '~1.600 tỷ' },
    ],
    accent: 'teal',
  },
]

export default function App() {
  const [active, setActive] = useState(null)

  if (active) {
    const report = reports.find(r => r.id === active)
    return (
      <div className="viewer">
        <button className="back-btn" onClick={() => setActive(null)}>
          ← Về trang chính
        </button>
        <iframe
          src={`${BASE}reports/${report.file}`}
          title={report.title}
          className="report-frame"
        />
      </div>
    )
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <div className="logo-diamond" />
            <div>
              <div className="logo-name">KHU DÂN CƯ Ê ĐEN</div>
              <div className="logo-sub">An Phú Tây · Bình Chánh · TP.HCM</div>
            </div>
          </div>
          <div className="header-meta">
            <span className="meta-tag">75.386 m² · Mặt tiền Nguyễn Văn Linh</span>
            <span className="meta-date">Cập nhật 23/04/2026</span>
          </div>
        </div>
      </header>

      <main className="main">
        <section className="hero">
          <p className="hero-eyebrow">TÀI LIỆU PHÂN TÍCH ĐẦU TƯ</p>
          <h1 className="hero-title">Khu Dân Cư Ê Đen</h1>
          <p className="hero-desc">
            Hai kịch bản phát triển — Quy hoạch gốc 1/500 (OG) và Điều chỉnh quy hoạch
            hệ số 8 lần (V1). Chọn tài liệu bên dưới để xem chi tiết.
          </p>

          <div className="compare-bar">
            <div className="compare-item">
              <span className="ci-label">OG → V1 Doanh thu</span>
              <span className="ci-value teal">+89%</span>
            </div>
            <div className="compare-sep" />
            <div className="compare-item">
              <span className="ci-label">OG → V1 LNST</span>
              <span className="ci-value teal">+3,3×</span>
            </div>
            <div className="compare-sep" />
            <div className="compare-item">
              <span className="ci-label">Tiến độ bồi thường</span>
              <span className="ci-value amber">71,9%</span>
            </div>
            <div className="compare-sep" />
            <div className="compare-item">
              <span className="ci-label">Mặt tiền Nguyễn Văn Linh</span>
              <span className="ci-value amber">~120m lộ giới</span>
            </div>
          </div>
        </section>

        <section className="grid-section">
          <div className="section-label">V1 — ĐIỀU CHỈNH QUY HOẠCH (ưu tiên)</div>
          <div className="cards-grid">
            {reports.filter(r => r.id.endsWith('-v1')).map(r => (
              <ReportCard key={r.id} report={r} onClick={() => setActive(r.id)} />
            ))}
          </div>

          <div className="section-label" style={{ marginTop: '2.5rem' }}>OG — QUY HOẠCH GỐC 1/500 (tham chiếu)</div>
          <div className="cards-grid">
            {reports.filter(r => r.id.endsWith('-og')).map(r => (
              <ReportCard key={r.id} report={r} onClick={() => setActive(r.id)} />
            ))}
          </div>
        </section>

        <section className="disclaimer">
          <p>
            Tài liệu này mang tính chất phân tích sơ bộ phục vụ quyết định đầu tư. Các số liệu
            dựa trên Quy hoạch 1/500 đã duyệt, Nghị quyết 87/2025/NQ-HĐND TP.HCM và giả định
            thị trường tại thời điểm lập. Nhà đầu tư cần thẩm định pháp lý độc lập trước khi
            đưa ra quyết định cuối cùng.
          </p>
        </section>
      </main>

      <footer className="footer">
        <span>© 2026 Khu Dân Cư Ê Đen — Tài liệu nội bộ</span>
      </footer>
    </div>
  )
}

function ReportCard({ report, onClick }) {
  return (
    <div className={`card card-${report.accent}`} onClick={onClick}>
      <div className="card-top">
        <span className={`card-tag ${report.tagClass}`}>{report.tag}</span>
        <div className="card-arrow">↗</div>
      </div>
      <h2 className="card-title">{report.title}</h2>
      <p className="card-sub">{report.subtitle}</p>
      <div className="card-stats">
        {report.stats.map(s => (
          <div key={s.label} className="stat">
            <div className="stat-val">{s.value}</div>
            <div className="stat-lbl">{s.label}</div>
          </div>
        ))}
      </div>
      <button className="card-btn">Xem tài liệu →</button>
    </div>
  )
}
