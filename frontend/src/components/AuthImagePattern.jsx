const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="pattern-wrapper">
      
      <div className="grid-pattern">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className={`grid-box ${i % 2 === 0 ? "animate-pulse" : ""}`}
          />
        ))}
      </div>

      <h2 className="pattern-title">{title}</h2>
      <p className="pattern-subtitle">{subtitle}</p>

    </div>
  );
};

export default AuthImagePattern;