import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form } from 'react-bootstrap';
import '../styles/css/Components/FeaturedBlogs.min.css';
import articlesData from '../assets/Articles.json';

export default function FeaturedBlog() {
  const [searchTerm, setSearchTerm] = useState('');
  const { featuredArticle, allArticles } = articlesData;

  const filteredArticles = allArticles.filter(article => {
    const searchLower = searchTerm.toLowerCase();
    return (
      article.title.toLowerCase().includes(searchLower) ||
      article.description.toLowerCase().includes(searchLower) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
      article.category.toLowerCase().includes(searchLower)
    );
  });

  return (
    <section className="featured_blog py-5" id='blog'>
      <Container>
        <h2 className="mb-4 text-center">Latest from the Blog</h2>
        <p className="subtitle mb-5 text-center">Insights on Backend engineering, tech leadership, and building scalable applications</p>
        
        {/* Search Box */}
        <div className="mb-5 search-container">
          <Form.Control
            type="search"
            placeholder="Search articles by title, tags, or content..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="search-results-count">
            {searchTerm && (
              <span>
                Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'result' : 'results'} for "{searchTerm}"
              </span>
            )}
          </div>
        </div>
        
        <Row className="g-4">
          {/* Featured Article (Left Side) - Only shown when not searching */}
          {!searchTerm && (
            <Col lg={7}>
              <Card className="h-100 featured-card">
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-3 flex-wrap">
                    {featuredArticle.featured && (
                      <Badge bg="primary" className="me-2 mb-1">Featured</Badge>
                    )}
                    <span className="text-muted me-2 mb-1">{featuredArticle.date}</span>
                    <span className="text-muted me-2 mb-1">•</span>
                    <span className="text-muted me-2 mb-1">{featuredArticle.readTime}</span>
                    <span className="text-muted me-2 mb-1">•</span>
                    <span className="text-muted mb-1">{featuredArticle.category}</span>
                  </div>
                  <img 
                    src={featuredArticle.image} 
                    alt={featuredArticle.title}
                    className="img-fluid mb-3 rounded"
                  />
                  <Card.Title as="h3" className="mb-3">{featuredArticle.title}</Card.Title>
                  <Card.Text className="flex-grow-1">
                    {featuredArticle.description}
                  </Card.Text>
                  <div className="mt-3 mb-4">
                    {featuredArticle.tags.map((tag, index) => (
                      <Badge key={index} bg="light" text="dark" className="me-2 mb-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {!featuredArticle.isInternal ? (
                    <Button variant="outline-primary" className="align-self-start" href={featuredArticle.link} target="_blank">
                    Read Article →
                  </Button>) : (
                    <Button variant="outline-primary" className="align-self-start" href={featuredArticle.link} target="_self">
                    Read Article →
                  </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          )}
          
          {/* Articles List (Right Side - Scrollable) */}
          <Col lg={searchTerm ? 12 : 5}>
            <div className="articles-scroll-container">
              {(searchTerm ? filteredArticles : allArticles).map((article) => (
                <Card key={article.id} className="mb-4 article-card">
                  <Card.Body>
                    <div className="d-flex text-muted mb-2 flex-wrap">
                      <span className="me-2">{article.date}</span>
                      <span className="mx-1">•</span>
                      <span className="me-2">{article.readTime}</span>
                      <span className="mx-1">•</span>
                      <span>{article.category}</span>
                    </div>
                    <Card.Title as="h4" className="mb-3">{article.title}</Card.Title>
                    <Card.Text className="mb-3">
                      {article.description}
                    </Card.Text>
                    <div className="mb-3">
                      {article.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} bg="light" text="dark" className="me-2 mb-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="link" className="px-0 text-decoration-none">
                      Read Article →
                    </Button>
                  </Card.Body>
                </Card>
              ))}
              
              {filteredArticles.length === 0 && searchTerm && (
                <div className="text-center py-5 no-results">
                  <h4>No articles found for "{searchTerm}"</h4>
                  <p className="text-muted">Try different search terms</p>
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => setSearchTerm('')}
                  >
                    Clear search
                  </Button>
                </div>
              )}
              
              {!searchTerm && (
                <div className="text-center mt-4 pt-2">
                  <Button variant="outline-secondary" className="view-all-btn">
                    View All Articles →
                  </Button>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}