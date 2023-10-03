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

function Colors() {
  const [color_name, setColor_name] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [old_price, setOld_price] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [color_id, setColorId] = useState("");
  const [image_main, setImgMain] = useState("");
  const [image_color, setImageColor] = useState([]);
  const [add, setAdd] = useState([]);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [updateProductId, setUpdateProductId] = useState("");
  const [del, setDel] = useState([]);
  const [colors, setColors] = useState([]);

  const [categories, setCategories] = useState([]);
  const [openImage, setOpenImage] = useState(false);
  const [getImg, setGetImg] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const MAX_COUNT = 5;
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [product_id,setProductId]=useState("")

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
  };

  const handleProductIdChange = (e) => {
    setColorId(e.target.value);
  };

  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          alert(`You can only add a maximum of ${MAX_COUNT} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });
    if (!limitExceeded) setUploadedFiles(uploaded);
  };
  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    const fileURLs = [];

    chosenFiles.forEach((file) => {
      const objectURL = URL.createObjectURL(file);
      fileURLs.push(objectURL);
    });

    setImageColor(fileURLs);
    handleUploadFiles(chosenFiles);
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1010/color/getproductdetails"
        );
        setAdd(response.data);
      } catch (error) {
        console.log(`Error getting product from frontend: ${error}`);
      }
    };

    fetchData();
  }, []);
  // useEffect(() => {
  //   console.log("id", product_id);
  // }, [product_id]);

  const handlePost = async () => {
  

    try {
      const imageUrls = image_color.join(",");
      // ... other data
      const response = await axios.post(
        "http://localhost:1010/color/add",
        {
            color_name,
       product_id,
            image_color: imageUrls, // Pass the string of image URLs
        }
      );
      const newColorId = response.data.color_id;
      setColorId(newColorId); // Set the product_id state variable

      console.log("id", newColorId);
      // console.log("id",product_id)
      console.log(response.data);
      setAdd(response.data);
      setOpenImage(true);
    } catch (error) {
      console.log(`Error fetching post data  ${error}`);
    }
  };

  const openUpdateForm = (color_id) => {
    setIsUpdateFormVisible(true);
    setUpdateProductId(color_id);
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1010/newimgproducts/images/${color_id}`
      );
      const relativePaths = response.data.images;
  
      // Convert relative paths to absolute URLs
      // const absolutePaths = relativePaths.map(relativePath => {
      //   return `http://localhost:1010${relativePath}`;
      // });
  
      setGetImg(relativePaths); // Update getImg state with absolute image URLs
    } catch (error) {
      console.log(`Error fetching images: ${error}`);
    }
  };
  
  const handleUpload = async () => {
    try {
      if (!color_id) {
        alert("Please enter a color_id.");
        return;
      }

      const formData = new FormData();
      formData.append("color_id", color_id);

      // Append image files to the FormData object
      images.forEach((image) => {
        formData.append("image", image);
      });

      // Send the FormData to the image upload route
      const response = await axios.post(
        "http://localhost:1010/newimgproducts/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message);
      // Fetch images only after the image upload is successful
      fetchImages(); // Call fetchImages here

      // Log getImg inside this function
      console.log("getimg", getImg);
    } catch (error) {
      console.error("Error uploading images:", error);
      setMessage("Image upload failed");
    }
  };

  useEffect(() => {
    // Log getImg when it changes
    console.log("getimg", getImg);
  }, [getImg]);

  const handleUpdate = async (
    color_id,
    color_name,
    product_id,
    image_color
  ) => {
    try {
      setUpdateProductId(color_id);

      const response = await axios.put(
        `http://localhost:1010/color/edit/${color_id}`,
        {
            color_name,
            product_id,
          image_color, // Pass the array of image URLs
        }
      );
      console.log("hello");
      console.log(response.data);
      setAdd("res", response.data);
      setIsUpdateFormVisible(false);
    } catch (error) {
      console.log(`Error in fetch edit data: ${error}`);
    }
  };

  const handleDelete = async (color_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:1010/color/delete/${color_id}`
      );
      console.log(color_id);
      console.log(response);

      setAdd((prevColor) =>
      prevColor.filter((color) => color.color_id !== color_id)
      );

      // setDel((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
    }
  };
  
  console.log("add", add);
  return (
    <>
     
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
   
                <CardTitle tag="h5">Add Colors</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Color Name</label>
                        <Input
                          type="text"
                          onChange={(e) => setColor_name(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Product id</label>
                        <Input
                          type="text"
                          onChange={(e) => setProductId(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Color image</label>
                        <Input
                              name="image"
                              type="file"
                              multiple
                              onChange={handleFileEvent}
                              disabled={fileLimit}
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
                        Add Color
                      </Button>
                    </div>
                  </Row>
                </Form>
                <Row>
                  {openImage && (
                    <div>
                      <Col className="pl-1" md="6">
                        <div>
                          <label htmlFor="productId">Color ID:</label>
                          <input
                            type="text"
                            id="productId"
                            value={color_id}
                            onChange={handleProductIdChange}
                          />
                        </div>
               
                      </Col>

                      <Col className="pl-1" md="6">
                        <FormGroup
                          action="/addproduct"
                          method="POST"
                          enctype="multipart/form-data"
                        >
                          <div>
                            <label>image slider</label>
                            <Input
                              name="image"
                              type="file"
                              multiple
                              onChange={handleFileEvent}
                              disabled={fileLimit}
                            />

                            <label htmlFor="fileUpload"></label>
                          </div>

                          {/* {image_slider.map((imageUrl, index) => (
                            <div key={index}>
                        <img src={imageUrl} alt="" />
                      </div>
                    ))} */}
                        </FormGroup>

                        {message && <p>{message}</p>}

                        <div className="update ml-auto mr-auto">
                          <Button
                            className="btn-round"
                            color="primary"
                            type="button"
                            onClick={handleUpload}
                          >
                            Add Image
                          </Button>
                        </div>
                      </Col>
                    </div>
                  )}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Colors Table</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>color_name</th>
                        <th>Product id</th>

                        <th>image_color</th>
                       
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(add) &&
                        add.map((color, index) => (
                          <tr key={color.color_id}>
                            <td>{color.color_name}</td>
                            <td>{color.product_id}</td>

                            {/* <td>
                              <img src={product.imagePath} alt="" />
                            </td> */}
<td>
                              {Array.isArray(color.image_color) &&
                                color.image_color.map((image, imageIndex) => (
                                  <img
                                    src={`http://localhost:1010/${image.image_color}`}
                                    alt=""
                                    onError={(e) =>
                                      console.log("Image load error", e)
                                    }
                                    style={{width:"100px" , height:"100px"}}
                                  />
                                ))}
                            </td>
                            <td>
                              {/* <img
                                src={`http://localhost:1010/${product.imagePath}`}
                                alt=""
                                onError={(e) =>
                                  console.log("Image load error", e)
                                }
                              /> */}
                            </td>



                            <td>
                              <button
                                onClick={() => handleDelete(color.color_id)}
                              >
                                delete
                              </button>
                              <button
                                onClick={() => openUpdateForm(color.color_id)}
                              >
                                update
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
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
                    <CardTitle tag="h5">Update Color</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Color Name</label>
                            <Input
                              type="text"
                              onChange={(e) => setColor_name(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      
                        {/* <Col className="pl-1" md="6">
                          <FormGroup>
                            <label>img_main</label>
                            <Input
                              type="file"
                              onChange={(e) => setImgMain(e.target.value)}
                            />
                          </FormGroup>
                        </Col> */}
                      </Row>
                      <Row>
                        <Col className="pl-1" md="6">
                          <FormGroup>
                            <label>image color</label>
                            <Input
                              type="file"
                              name="image"
                              multiple
                              accept="image/*"
                              onChange={handleFileEvent}
                              disabled={fileLimit}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      {/* <Row>
                 <Col md="12">
                   <FormGroup>
                     <label>Address</label>
                     <Input
                       defaultValue="Melbourne, Australia"
                       placeholder="Home Address"
                       type="text"
                     />
                   </FormGroup>
                 </Col>
               </Row>
               <Row>
                 <Col className="pr-1" md="4">
                   <FormGroup>
                     <label>City</label>
                     <Input
                       defaultValue="Melbourne"
                       placeholder="City"
                       type="text"
                     />
                   </FormGroup>
                 </Col>
                 <Col className="px-1" md="4">
                   <FormGroup>
                     <label>Country</label>
                     <Input
                       defaultValue="Australia"
                       placeholder="Country"
                       type="text"
                     />
                   </FormGroup>
                 </Col>
                 <Col className="pl-1" md="4">
                   <FormGroup>
                     <label>Postal Code</label>
                     <Input placeholder="ZIP Code" type="number" />
                   </FormGroup>
                 </Col>
               </Row>
               <Row>
                 <Col md="12">
                   <FormGroup>
                     <label>About Me</label>
                     <Input
                       type="textarea"
                       defaultValue="Oh so, your weak rhyme You doubt I'll bother, reading into it"
                     />
                   </FormGroup>
                 </Col>
               </Row> */}
                      <Row>
                        <div className="update ml-auto mr-auto">
                          <Button
                            className="btn-round"
                            color="primary"
                            type="button"
                            onClick={() =>
                              handleUpdate(
                                updateProductId,
                                color_name,
                                image_color
                              )
                            }
                          >
                            Update Color
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

export default Colors;
