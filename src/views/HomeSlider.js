
import axios from "axios";
import React, { useState, useEffect } from "react";

// reactstrap components
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

function HomeSlider() {
  const [add, setAdd] = useState([]);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [updateBlogId, setUpdateBlogId] = useState("");
  const [image_slider, setImage_slider] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [updateImage, setUpdateImage] = useState(""); // Separate state for image
  const [updateDetails, setUpdateDetails] = useState(""); // Separate state for details
  const [del, setDel] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1010/homeslider/gethomeslider"
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
      formData.append('image_slider', image_slider);
    
  
      const response = await axios.post(
        "http://localhost:1010/homeslider/add",
        formData, // Send the FormData object
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          },
        }
      );
  
      setAdd(response.data);
      console.log("getorder",add)
    } catch (error) {
      console.log(`Error fetching post data  ${error}`);
    }
  };
  const openUpdateForm = (p_id) => {
    setIsUpdateFormVisible(true);
    setUpdateBlogId(p_id);
  };






  const handleUpdate = async (id) => {
    try {
      const formData = new FormData();
      formData.append('image_slider', image_slider);
    
  
      const response = await axios.put(
        `http://localhost:1010/blog/edit/${id}`,
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
          blog.id === id ? response.data : blog
        )
      );
      setIsUpdateFormVisible(false);
    } catch (error) {
      console.log(`Error in fetch edit data: ${error}`);
    }
  };

  const handleDelete = async (id, index) => {
    try {
      const response = await axios.delete(
        `http://localhost:1010/homeslider/delete/${id}`
      );
      console.log(id);
      console.log(response);

      setAdd((prevProduct) =>
        prevProduct.filter((product) => product.id !== id)
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
                <CardTitle tag="h5">Add Home Image</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                 
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">Image </label>
                        <input
                          type="file"
                          name="image_blog"
                          onChange={(e) => setImage_slider(e.target.files[0])} // Update state with the selected file
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
                        Add Image
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
                        <th>Image</th>
                      </tr>
                    </thead>
                    {add &&
                      Array.isArray(add) &&
                      add.map((img, index) => (
                        <tbody key={img.id}>
                          <tr key={img.id}>
                           
                            <td>
                              <img
                                src={`http://localhost:1010/${img.image_slider}`}
                                alt="img"
                                // onError={(e) =>
                                //   console.log("Image load error", e)
                                // }
                              />{" "}
                            </td>

                            <td>
                              <button
                                onClick={
                                  () => handleDelete(img.id, index) // Calling handleDelete with the product's _id and index
                                }
                              >
                                delete
                              </button>
                              {/* <button
                                onClick={() => openUpdateForm(img.id)}
                              >
                                update
                              </button> */}
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
                       
                        <Col className="pl-1" md="4">
                        <FormGroup>
                        <label htmlFor="exampleInputEmail1">Image </label>
                        <input
                          type="file"
                          name="image_blog"
                          onChange={(e) => setImage_slider(e.target.files[0])} // Update state with the selected file
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

export default HomeSlider;
