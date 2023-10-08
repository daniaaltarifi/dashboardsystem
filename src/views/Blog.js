
import axios from "axios";
import React, { useState, useEffect } from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Table,
} from "reactstrap";
import Tables from "./Tables";

function Blog() {
  const [add, setAdd] = useState([]);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [updateBlogId, setUpdateBlogId] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [updateImage, setUpdateImage] = useState(""); // Separate state for image
  const [updateDetails, setUpdateDetails] = useState(""); // Separate state for details
  const [del, setDel] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://monkfish-app-wyvrc.ondigitalocean.app/blog/data"
        );
        setAdd(response.data);
      } catch (error) {
        console.log(`Error getting Blog from frontend: ${error}`);
      }
    };

    fetchData();
  }, []);
 
 
 
 




  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append('title', updateTitle);
      formData.append('date', updateDate);
      formData.append('details', updateDetails);
      formData.append('image_blog', updateImage); // Append the selected image file
  
      const response = await axios.post(
        "http://localhost:1010/blog/add",
        formData, // Send the FormData object
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          },
        }
      );
  
      setAdd(response.data);
    } catch (error) {
      console.log(`Error fetching post data  ${error}`);
    }
  };
  const openUpdateForm = (p_id) => {
    setIsUpdateFormVisible(true);
    setUpdateBlogId(p_id);
  };






  const handleUpdate = async (id_blogs) => {
    try {
      const formData = new FormData();
      formData.append('title', updateTitle);
      formData.append('date', updateDate);
      formData.append('details', updateDetails);
      formData.append('image_blog', updateImage); // Append the selected image file
  
      const response = await axios.put(
        `http://localhost:1010/blog/edit/${id_blogs}`,
        formData, // Send the FormData object
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          },
        }
      );
      console.log(response.data);
      setAdd((prevAdd) =>
        prevAdd.map((blog) =>
          blog.id_blogs === id_blogs ? response.data : blog
        )
      );
      setIsUpdateFormVisible(false);
    } catch (error) {
      console.log(`Error in fetch edit data: ${error}`);
    }
  };

  const handleDelete = async (id_blogs, index) => {
    try {
      const response = await axios.delete(
        `http://localhost:1010/blog/delete/${id_blogs}`
      );
      console.log(id_blogs);
      console.log(response);

      setAdd((prevProduct) =>
        prevProduct.filter((product) => product.id_blogs !== id_blogs)
      );

      setDel((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Add Blog</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Title</label>
                        <Input
                          type="text"
                          onChange={(e) => setUpdateTitle(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Date</label>
                        <Input
                          type="text"
                          onChange={(e) => setUpdateDate(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">Image </label>
                        <input
                          type="file"
                          name="image_blog"
                          onChange={(e) => setUpdateImage(e.target.files[0])} // Update state with the selected file
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Details</label>
                        <Input
                          type="textarea"
                          onChange={(e) => setUpdateDetails(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="button"
                        onClick={handlePost}
                      >
                        Add Blog
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Blog Table</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Image</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    {add &&
                      Array.isArray(add) &&
                      add.map((blog, index) => (
                        <tbody key={blog.id_blogs}>
                          <tr key={blog.id_blogs}>
                            <td>{blog.title}</td>
                            <td>{blog.date}</td>
                            <td>
                              <img
                                src={`http://localhost:1010/${blog.image_blog}`}
                                alt="blog"
                                style={{ width: "20%", height: "20%" }}
                                onError={(e) =>
                                  console.log("Image load error", e)
                                }
                              />{" "}
                            </td>
                            <td>{blog.details}</td>

                            <td>
                              <button
                                onClick={
                                  () => handleDelete(blog.id_blogs, index) // Calling handleDelete with the product's _id and index
                                }
                              >
                                delete
                              </button>
                              <button
                                onClick={() => openUpdateForm(blog.id_blogs)}
                              >
                                update
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      ))}
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <Row>
          <Col md="12">
            <Card className="card-user">
              {isUpdateFormVisible && (
                <div>
                  <CardHeader>
                    <CardTitle tag="h5">Update Blog</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Title</label>
                            <Input
                              type="text"
                              value={updateTitle}
                              onChange={(e) => setUpdateTitle(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Date</label>
                            <Input
                              type="text"
                              value={updateDate}
                              onChange={(e) => setUpdateDate(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="4">
                        <FormGroup>
                        <label htmlFor="exampleInputEmail1">Image </label>
                        <input
                          type="file"
                          name="image_blog"
                          onChange={(e) => setUpdateImage(e.target.files[0])} // Update state with the selected file
                        />
                      </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Details</label>
                            <Input
                              type="textarea"
                              value={updateDetails}
                              onChange={(e) => setUpdateDetails(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <div className="update ml-auto mr-auto">
                          <Button
                            className="btn-round"
                            color="primary"
                            type="submit"
                            onClick={() => handleUpdate(updateBlogId)}
                          >
                            Update Blog
                          </Button>
                        </div>
                      </Row>
                    </Form>
                  </CardBody>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Blog;
