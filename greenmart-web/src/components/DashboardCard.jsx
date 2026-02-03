function DashboardCard({ title, value, color, onClick }) {
    return (
      <div className="col-md-3 col-sm-6">
        <div
          className={`card border-${color} shadow-sm`}
          style={{
            cursor: "pointer",
            pointerEvents: "auto"
          }}
          onClick={() => {
            console.log("CARD CLICKED:", title)
            if (onClick) onClick()
          }}
        >
          <div className="card-body text-center">
            <h6 className="text-muted">{title}</h6>
            <h2 className={`text-${color}`}>{value}</h2>
          </div>
        </div>
      </div>
    )
  }
  
  export default DashboardCard
  