import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import styles from '../../styles/FilterBox.module.css';

export default function FilterBox({filterString, setFilterString, setCategory }) {
  const handleChange = (e) => {
    setFilterString(e.target.value);
  }

  const handleCategory = (e) => {
    setCategory(e.target.value);
  }
  
  const filterCategory = ['name', 'price', 'location'];
  
  return (
    <Container className={styles.filter}>
      <div
      style={{marginTop:"2rem"}}
      />
      <Row className="justify-content-center">
        <Col xs={6} sm={6} md={4}>
          <Form.Control type="text" value={filterString} placeholder="filter items..." onChange={handleChange} />
        </Col>
        <Col xs={6} sm={6} md={3}>
          <div className={styles.selectMenu}>
            <span style={{marginRight:"1rem"}}>by</span>
            <Form.Control
            onChange={handleCategory} as="select" defaultValue="name">
              {filterCategory.map((category,k) => {
                return <option key={k}> {category} </option>
              })}
            </Form.Control>
          </div>
        </Col>
      </Row>
    </Container>
  );
}