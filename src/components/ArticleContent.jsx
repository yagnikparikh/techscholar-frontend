// ArticleContent.js

import React from 'react';
import ImpNote from './ImpNote';
import CodeComonenet from './CodeComonenet';
import ArticleParagraph from './ArticleParagraph';
import ArticleHeading from './ArticleHeading';

function ArticleContent() {
  return (
    <div className='bg-gray-800 text-white text-justify sp'style={{  whiteSpace: 'pre-wrap' ,flex: '1',height:'100vh', padding: '20px', overflowY: 'scroll',overflowX:'hidden' }}>
      {/* Your article content */}

      <ArticleHeading str='Machine Learning Tutorial'/>

      <ArticleParagraph str='Machine learning (ML) is a subdomain of artificial intelligence (AI) that focuses on developing systems that learn—or improve performance—based on the data they ingest. Artificial intelligence is a broad word that refers to systems or machines that resemble human intelligence. Machine learning and AI are frequently discussed together, and the terms are occasionally used interchangeably, although they do not signify the same thing. A crucial distinction is that, while all machine learning is AI, not all AI is machine learning.'/>

      <ImpNote str='olor sit amet, consectetur adipiscing elit. Curabitur auctor nec elit sit amet sagittis. Proin euismod aliquet est, sit amet tincidunt ex sollicitudin a. Duis vel ex vel mauris ullamcorper accumsan. Sed vitae nisl nec tellus dapibus ultricies. Integer tincidunt, quam eu sollicitudin placerat, quam justo hendrerit nulla, ut luctus dui ex nec arcu.'/>

      <ArticleParagraph str='Machine learning (ML) is a subdomain of artificial intelligence (AI) that focuses on developing systems that learn—or improve performance—based on the data they ingest. Artificial intelligence is a broad word that refers to systems or machines that resemble human intelligence. Machine learning and AI are frequently discussed together, and the terms are occasionally used interchangeably, although they do not signify the same thing. A crucial distinction is that, while all machine learning is AI, not all AI is machine learning.'/>
      <ArticleParagraph str='Machine Learning tutorial covers basic and advanced concepts, specially designed to cater to both students and experienced working professionals.'/>
      

      <CodeComonenet/>
 
      <ArticleParagraph str='Machine learning (ML) is a subdomain of artificial intelligence (AI) that focuses on developing systems that learn—or improve performance—based on the data they ingest. Artificial intelligence is a broad word that refers to systems or machines that resemble human intelligence. Machine learning and AI are frequently discussed together, and the terms are occasionally used interchangeably, although they do not signify the same thing. A crucial distinction is that, while all machine learning is AI, not all AI is machine learning.'/>
      
      <ArticleParagraph str='Machine Learning tutorial covers basic and advanced concepts, specially designed to cater to both students and experienced working professionals.'/>
      
    </div>
  );
}

export default ArticleContent;
