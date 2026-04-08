import React from "react";
import { useNavigate } from "react-router";

const ReportCards = ({ report }) => {
  const navigate = useNavigate();

  return (
    <li
      className="reports__card"
      onClick={() => navigate(`/interview/${report._id}`)}
    >
      <h3 className="reports__card-title">
        {report?.title || "Untitled Position"}
      </h3>

      <p className="reports__card-date">
        Generated on {new Date(report.createdAt).toLocaleDateString()}
      </p>
    </li>
  );
};

export default ReportCards;