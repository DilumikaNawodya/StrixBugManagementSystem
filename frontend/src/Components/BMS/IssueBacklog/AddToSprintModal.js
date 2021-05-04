import React from "react";
import { sprintService } from "../../../Services/SprintService";
import { projectService } from "../../../Services/ProjectService";
import { Field, Formik, Form } from "formik";

function AddToSprintModal(props) {
  const pid = projectService.getCurrentProject();
  const { sprints } = sprintService.GetSprintList(pid);

  const initialValues = {
    sprintSelect: 1,
  };

  function onSubmit(fields) {
    // console.log(fields.sprintSelect);
    sprintService.AddToSprint(fields.sprintSelect, props.data.id);
  }

  return (
    <div>
      <button
        type="button btn-primary"
        class="close"
        data-dismiss="modal"
        onClick={props.cl}
      >
        &times;
      </button>
      <h4>Add To Sprint</h4>

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting }) => {
          return (
            <Form>
              <div className="form-row">
                <div className="form-group col-12">
                  <label>Select Sprint</label>
                  <Field
                    name="sprintSelect"
                    as="select"
                    className="form-control"
                  >
                    {sprints.map((e) => {
                      if (e.status === true) {
                        return <option value={e.id}>{e.name}</option>;
                      }
                    })}
                  </Field>
                </div>
              </div>
              <button class="btn btn-dark pull-right" type="submit">
                {isSubmitting && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
                Update
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default AddToSprintModal;
