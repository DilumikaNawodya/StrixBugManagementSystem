import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../../Services/Base";
import { Modal } from "react-bootstrap";

export const backlogFunctions = {
  addBugsToBSP,
};

function addBugsToBSP(rowData, approval, bspstatus) {
  const request = API.patch(
    "/statusupdate/" + rowData.id + "/",
    {
      approval: approval,
      bspstatus: bspstatus,
    },
    {}
  );
  window.location.reload(true);
  return request;
}

