export default function LoadingSpinner() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end" }}>
      <div
        style={{
          width: "20px",
          height: "20px",
          border: "2px solid gray",
          borderTopColor: "transparent",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
