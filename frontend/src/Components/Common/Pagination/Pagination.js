import React,{useState} from "react";
import { Pagination } from "react-bootstrap";

const SetPagination = ({ IssuePerPage, totalIssues, paginate }) => {

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalIssues / IssuePerPage); i++) {
    pageNumbers.push(i);
  }
  
  return (
    <Pagination>
      {pageNumbers.map((number) => (
        <Pagination.Item onClick={() => paginate(number)}>
          {number}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default SetPagination;
