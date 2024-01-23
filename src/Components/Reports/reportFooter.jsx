import footer from "../../Assets/footer.png";

const ReportFooter = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ position: "absolute", bottom: 15 }}>
        <div>
          {/* <img src={footer} alt="footer" style={{ width: 450 }} /> */}
        </div>
   
      </div>
    </div>
  );
};

export default ReportFooter;
