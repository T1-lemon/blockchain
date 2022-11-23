import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup,
} from "@themesberg/react-bootstrap";

import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

const InputProduct = () => {
  const [birthday, setBirthday] = useState("");
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
  });

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        setWeb3Api({
          provider,
          web3: new Web3(provider),
        });
      } else {
        console.error("please, Install Metamask");
      }
    };
    loadProvider();
  }, []);

  const handleCornetWallet = () => {
    web3Api.provider.request({ method: "eth_requestAccounts" });
  };

  return (
    <Row>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>Insert Product</h4>
          <p className="mb-0">Insert your product to blockchain</p>
        </div>
      </div>

      <Col xs={6} >
        <Button className="mb-3" onClick={handleCornetWallet}>
          Cornet Wallet
        </Button>
        <div className="mb-3">
          <p>
            Address: <span>Unvalid Address</span>
          </p>
        </div>
      </Col>
      <Col xs={12} xl={12}>
        <Card border="light" className="bg-white shadow-sm mb-4">
          <Card.Body>
            <Form>
              <Row>
                <Col md={12} className="mb-3">
                  <Form.Group id="firstName">
                    <Form.Label>Product's name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter product's name"
                    />
                  </Form.Group>
                </Col>
                <Col md={12} className="mb-3">
                  <Form.Group id="lastName">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter product's price"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col md={12} className="mb-3">
                  <Form.Group id="birthday">
                    <Form.Label>Date</Form.Label>
                    <Datetime
                      timeFormat={false}
                      onChange={setBirthday}
                      renderInput={(props, openCalendar) => (
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </InputGroup.Text>
                          <Form.Control
                            required
                            type="text"
                            value={
                              birthday
                                ? moment(birthday).format("MM/DD/YYYY")
                                : ""
                            }
                            placeholder="mm/dd/yyyy"
                            onFocus={openCalendar}
                            onChange={() => {}}
                          />
                        </InputGroup>
                      )}
                    />
                  </Form.Group>
                </Col>
                <Col md={12} className="mb-3">
                  <Form.Group id="gender">
                    <Form.Label>Category</Form.Label>
                    <Form.Select defaultValue="0">
                      <option value="0">Electronic</option>
                      <option value="1">Medicine</option>
                      <option value="2">File</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={12} className="mb-3">
                  <Form.Group id="gender">
                    <Form.Label>Description</Form.Label>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                  </Form.Group>
                </Col>
              </Row>
              <div className="mt-3">
                <Button variant="primary" type="submit">
                  Save All
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default InputProduct;
