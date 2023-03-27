/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import Records from "../db.json";
import { Modal, ModalBody, ModalHeader, Row, Col, Button } from "reactstrap";
import axios from "axios";

const AddDropDown = () => {
  const [modal, setModal] = useState(false);
  const [count, setCount] = useState(0);
  const [selectedItemList, setSelectedItemList] = useState([]);
  const [currentSelectValue, setCurrentSelectValue] = useState();

  //   const optionsList = ["item1", "item2", "item3", "item4", "item5"];
  var finalArray = Records.map(function (obj) {
    return obj.label;
  });

  const renderDropdown = React.useCallback(() => {
    let list = [];

    let newOptionsList = finalArray.filter((option) => {
      //console.log({ selectedItemList, option });
      return !selectedItemList?.includes(option);
    });

    for (let i = 0; i <= count; i++) {
      list.push(
        <div key={i}>
          <div>
            <div>
              <select
                type="select"
                name="select"
                id="exampleSelect"
                value={selectedItemList[i]}
                onChange={(e) => {
                  setCurrentSelectValue(e.target.value);
                }}
                disabled={i < count}
              >
                {i < count ? (
                  <option key={selectedItemList[i]} value={selectedItemList[i]}>
                    {selectedItemList[i]}
                  </option>
                ) : (
                  newOptionsList.map((option, key) => {
                    return (
                      <option key={option + key} value={option}>
                        {option}
                      </option>
                    );
                  })
                )}
              </select>
            </div>
          </div>
        </div>
      );
    }

    return list;
  }, [count, setCurrentSelectValue, selectedItemList]);
  //console.log(selectedItemList);

  console.log();

  const handleNew = (e) => {
    if (currentSelectValue) {
      setSelectedItemList((selecteds) => selecteds.concat(currentSelectValue));
      setCurrentSelectValue(null);
      setCount(count + 1);
    }
  };

  function handleSubmit(event) {
    console.log(selectedItemList);
    axios
      .post(`https://webhook.site/bffc12b0-541f-4ed7-a191-95c568f1845d/`, {
        selectedItemList,
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Modal size="lg" isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>
          Saving Segment
        </ModalHeader>

        <ModalBody>
          <form>
            <Row>
              <Col lg={12}>
                <div>
                  <label>Enter the Name of the Segment</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name of the Segment"
                  />
                </div>
              </Col>
            </Row>
            <br></br>

            <Row>
              <Col lg={12}>
                <h6>Select the Schema dropdown</h6>

                <div className="form-control">{renderDropdown()}</div>
              </Col>
            </Row>

            <br></br>
            <Row>
              <Col lg={12}>
                <Button color="link" onClick={handleNew}>
                  + Add New Schema
                </Button>
                <Button onClick={handleSubmit}>Save</Button>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>

      <button
        className="btn mt-3"
        style={{ backgroundColor: "blue", color: "white" }}
        onClick={() => setModal(true)}
      >
        Save Segment
      </button>
    </div>
  );
};

export default AddDropDown;
