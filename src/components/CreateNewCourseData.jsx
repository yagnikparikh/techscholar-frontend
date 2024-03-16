import React from 'react'

function CreateNewCourseData() {

    const [courseDataTitle, setCourseDataTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mp4File, setMp4File] = useState(null);
  const [jpgFile, setJpgFile] = useState(null);

  const handleMp4FileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'video/mp4') {
      setMp4File(file);
    } else {
      alert('Please select an MP4 file.');
    }
  };

  const handleJpgFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/jpeg') {
      setJpgFile(file);
    } else {
      alert('Please select a JPG file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('courseDataTitle', courseDataTitle);
    formData.append('description', description);
    formData.append('mp4File', mp4File);
    formData.append('jpgFile', jpgFile);
  
    try {
      const response = await fetch('http://localhost:8080/api/coursedata', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        alert('Course data uploaded successfully!');
      } else {
        alert('Failed to upload course data.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form.');
    }
  };
  

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="courseDataTitle">
        <Form.Label>Course Data Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={courseDataTitle}
          onChange={(e) => setCourseDataTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="mp4File">
        <Form.Label>MP4 File</Form.Label>
        <Form.Control
          type="file"
          accept="video/mp4"
          onChange={handleMp4FileChange}
        />
      </Form.Group>

      <Form.Group controlId="jpgFile">
        <Form.Label>JPG File</Form.Label>
        <Form.Control
          type="file"
          accept="image/jpeg"
          onChange={handleJpgFileChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default CreateNewCourseData
