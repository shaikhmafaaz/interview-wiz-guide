
// Question banks for different roles and experience levels
export interface Question {
  id: number;
  question: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export interface RoleQuestions {
  fresher: Question[];
  experienced: Question[];
}

export type QuestionBank = {
  [role: string]: RoleQuestions;
};

const questionBank: QuestionBank = {
  "frontend-developer": {
    fresher: [
      { id: 1, question: "What is HTML?", difficulty: "easy", category: "basics" },
      { id: 2, question: "What is the difference between let, const, and var in JavaScript?", difficulty: "easy", category: "javascript" },
      { id: 3, question: "Explain the box model in CSS.", difficulty: "medium", category: "css" },
      { id: 4, question: "What are semantic HTML tags?", difficulty: "easy", category: "html" },
      { id: 5, question: "What is responsive web design?", difficulty: "medium", category: "css" },
      { id: 6, question: "Explain CSS Flexbox.", difficulty: "medium", category: "css" },
      { id: 7, question: "What is the purpose of the alt attribute in images?", difficulty: "easy", category: "html" },
      { id: 8, question: "What is a callback function in JavaScript?", difficulty: "medium", category: "javascript" },
      { id: 9, question: "What are pseudo-classes in CSS?", difficulty: "medium", category: "css" },
      { id: 10, question: "Explain the concept of hoisting in JavaScript.", difficulty: "medium", category: "javascript" }
    ],
    experienced: [
      { id: 1, question: "Explain the virtual DOM concept in modern frontend frameworks.", difficulty: "hard", category: "frameworks" },
      { id: 2, question: "What are closures in JavaScript and how would you use them?", difficulty: "hard", category: "javascript" },
      { id: 3, question: "Compare and contrast REST and GraphQL.", difficulty: "hard", category: "api" },
      { id: 4, question: "Explain Cross-Origin Resource Sharing (CORS) and how to handle it.", difficulty: "medium", category: "security" },
      { id: 5, question: "What are web workers and when would you use them?", difficulty: "hard", category: "javascript" },
      { id: 6, question: "Describe your approach to making a website accessible.", difficulty: "medium", category: "accessibility" },
      { id: 7, question: "Explain code-splitting and its benefits.", difficulty: "hard", category: "performance" },
      { id: 8, question: "What are service workers and how can they be used to build PWAs?", difficulty: "hard", category: "pwa" },
      { id: 9, question: "Describe your strategy for state management in large applications.", difficulty: "hard", category: "architecture" },
      { id: 10, question: "How do you implement authentication in a frontend application?", difficulty: "medium", category: "security" }
    ]
  },
  "backend-developer": {
    fresher: [
      { id: 1, question: "What is an API?", difficulty: "easy", category: "basics" },
      { id: 2, question: "Explain the difference between GET and POST HTTP methods.", difficulty: "easy", category: "http" },
      { id: 3, question: "What is a database and what are the common types?", difficulty: "easy", category: "databases" },
      { id: 4, question: "What is server-side rendering?", difficulty: "medium", category: "concepts" },
      { id: 5, question: "Explain what JSON is and its common use cases.", difficulty: "easy", category: "data" },
      { id: 6, question: "What is middleware in the context of web servers?", difficulty: "medium", category: "architecture" },
      { id: 7, question: "Describe the basics of authentication and authorization.", difficulty: "medium", category: "security" },
      { id: 8, question: "What is the purpose of environment variables?", difficulty: "easy", category: "basics" },
      { id: 9, question: "What is CRUD?", difficulty: "easy", category: "basics" },
      { id: 10, question: "Explain the concept of API versioning.", difficulty: "medium", category: "api" }
    ],
    experienced: [
      { id: 1, question: "Explain horizontal vs vertical scaling and when you would choose one over the other.", difficulty: "hard", category: "architecture" },
      { id: 2, question: "Describe your experience with microservices architecture.", difficulty: "hard", category: "architecture" },
      { id: 3, question: "What strategies do you use for handling database migrations?", difficulty: "medium", category: "databases" },
      { id: 4, question: "Explain the CAP theorem and its implications for distributed systems.", difficulty: "hard", category: "distributed systems" },
      { id: 5, question: "How do you handle rate limiting in an API?", difficulty: "medium", category: "api" },
      { id: 6, question: "Describe your approach to logging and monitoring in production systems.", difficulty: "medium", category: "devops" },
      { id: 7, question: "What are the strategies for securing an API?", difficulty: "medium", category: "security" },
      { id: 8, question: "How would you design a system with high availability requirements?", difficulty: "hard", category: "architecture" },
      { id: 9, question: "Explain how you would implement caching in a backend system.", difficulty: "medium", category: "performance" },
      { id: 10, question: "Describe your experience with message queues and event-driven architectures.", difficulty: "hard", category: "architecture" }
    ]
  },
  "full-stack-developer": {
    fresher: [
      { id: 1, question: "What is the difference between frontend and backend development?", difficulty: "easy", category: "basics" },
      { id: 2, question: "What is a full stack?", difficulty: "easy", category: "basics" },
      { id: 3, question: "Explain the client-server model.", difficulty: "medium", category: "architecture" },
      { id: 4, question: "What is the purpose of version control systems like Git?", difficulty: "easy", category: "tools" },
      { id: 5, question: "Explain the MVC architecture pattern.", difficulty: "medium", category: "architecture" },
      { id: 6, question: "What are the common HTTP status codes and their meanings?", difficulty: "medium", category: "http" },
      { id: 7, question: "What is responsive web design and why is it important?", difficulty: "easy", category: "frontend" },
      { id: 8, question: "What is the difference between SQL and NoSQL databases?", difficulty: "medium", category: "databases" },
      { id: 9, question: "Explain what RESTful APIs are.", difficulty: "medium", category: "api" },
      { id: 10, question: "What are common web security concerns and how do you address them?", difficulty: "medium", category: "security" }
    ],
    experienced: [
      { id: 1, question: "Describe your approach to designing a scalable web application from scratch.", difficulty: "hard", category: "architecture" },
      { id: 2, question: "How do you manage state between the frontend and backend?", difficulty: "hard", category: "architecture" },
      { id: 3, question: "Explain your experience with CI/CD pipelines.", difficulty: "medium", category: "devops" },
      { id: 4, question: "How do you ensure good performance across both frontend and backend?", difficulty: "hard", category: "performance" },
      { id: 5, question: "Describe your approach to testing in a full-stack application.", difficulty: "medium", category: "testing" },
      { id: 6, question: "How do you handle authentication and authorization across the stack?", difficulty: "medium", category: "security" },
      { id: 7, question: "What strategies do you use for error handling across the stack?", difficulty: "medium", category: "architecture" },
      { id: 8, question: "Explain how you would implement real-time features in a web application.", difficulty: "hard", category: "features" },
      { id: 9, question: "How would you approach internationalization in a web application?", difficulty: "medium", category: "features" },
      { id: 10, question: "Describe your experience with serverless architectures.", difficulty: "hard", category: "architecture" }
    ]
  },
  "data-scientist": {
    fresher: [
      { id: 1, question: "What is data science?", difficulty: "easy", category: "basics" },
      { id: 2, question: "Explain the difference between supervised and unsupervised learning.", difficulty: "medium", category: "ml" },
      { id: 3, question: "What is the difference between classification and regression?", difficulty: "medium", category: "ml" },
      { id: 4, question: "What are common data preprocessing steps?", difficulty: "easy", category: "basics" },
      { id: 5, question: "What is overfitting and how can it be prevented?", difficulty: "medium", category: "ml" },
      { id: 6, question: "Explain the concept of cross-validation.", difficulty: "medium", category: "ml" },
      { id: 7, question: "What is the purpose of exploratory data analysis?", difficulty: "easy", category: "basics" },
      { id: 8, question: "What is a confusion matrix?", difficulty: "medium", category: "ml" },
      { id: 9, question: "Explain the difference between correlation and causation.", difficulty: "medium", category: "statistics" },
      { id: 10, question: "What are outliers and how do you handle them?", difficulty: "medium", category: "data cleaning" }
    ],
    experienced: [
      { id: 1, question: "How would you handle imbalanced datasets?", difficulty: "hard", category: "ml" },
      { id: 2, question: "Explain the bias-variance tradeoff.", difficulty: "hard", category: "ml" },
      { id: 3, question: "What feature selection methods have you used and when would you apply them?", difficulty: "hard", category: "ml" },
      { id: 4, question: "Describe your approach to building a recommendation system.", difficulty: "hard", category: "ml" },
      { id: 5, question: "How do you evaluate if a model is performing well?", difficulty: "medium", category: "ml" },
      { id: 6, question: "Explain how you would deploy a machine learning model to production.", difficulty: "hard", category: "engineering" },
      { id: 7, question: "What are the ethical considerations in data science?", difficulty: "medium", category: "ethics" },
      { id: 8, question: "How do you handle missing data in large datasets?", difficulty: "medium", category: "data cleaning" },
      { id: 9, question: "Explain the concept of ensemble learning and when you would use it.", difficulty: "hard", category: "ml" },
      { id: 10, question: "How would you communicate complex technical findings to non-technical stakeholders?", difficulty: "medium", category: "communication" }
    ]
  },
  "product-manager": {
    fresher: [
      { id: 1, question: "What is a product manager's role?", difficulty: "easy", category: "basics" },
      { id: 2, question: "What is a product roadmap?", difficulty: "easy", category: "basics" },
      { id: 3, question: "How would you prioritize features for a product?", difficulty: "medium", category: "strategy" },
      { id: 4, question: "What is the difference between user stories and requirements?", difficulty: "medium", category: "methodology" },
      { id: 5, question: "What is MVP (Minimum Viable Product)?", difficulty: "easy", category: "basics" },
      { id: 6, question: "How do you gather user feedback?", difficulty: "easy", category: "research" },
      { id: 7, question: "What is the product development lifecycle?", difficulty: "medium", category: "process" },
      { id: 8, question: "How do you work with developers and designers?", difficulty: "medium", category: "collaboration" },
      { id: 9, question: "What makes a good user story?", difficulty: "medium", category: "methodology" },
      { id: 10, question: "How do you measure product success?", difficulty: "medium", category: "analytics" }
    ],
    experienced: [
      { id: 1, question: "Describe a time when you had to make a difficult product decision with incomplete information.", difficulty: "hard", category: "decision making" },
      { id: 2, question: "How do you balance stakeholder requests with user needs?", difficulty: "hard", category: "strategy" },
      { id: 3, question: "How do you handle technical debt in your product planning?", difficulty: "medium", category: "planning" },
      { id: 4, question: "Describe your approach to product strategy and vision.", difficulty: "hard", category: "strategy" },
      { id: 5, question: "How do you decide when to pivot a product direction?", difficulty: "hard", category: "strategy" },
      { id: 6, question: "How do you manage products in different stages of the lifecycle?", difficulty: "medium", category: "management" },
      { id: 7, question: "How do you approach internationalization and localization in product development?", difficulty: "medium", category: "strategy" },
      { id: 8, question: "Describe how you would approach a product launch.", difficulty: "medium", category: "process" },
      { id: 9, question: "How do you communicate product changes to users?", difficulty: "medium", category: "communication" },
      { id: 10, question: "How do you handle conflicts between different departments regarding product decisions?", difficulty: "hard", category: "leadership" }
    ]
  },
  "ui-ux-designer": {
    fresher: [
      { id: 1, question: "What is the difference between UI and UX?", difficulty: "easy", category: "basics" },
      { id: 2, question: "What is a wireframe?", difficulty: "easy", category: "basics" },
      { id: 3, question: "Explain the concept of user-centered design.", difficulty: "medium", category: "methodology" },
      { id: 4, question: "What are the key principles of visual design?", difficulty: "medium", category: "design" },
      { id: 5, question: "What is a user persona and why is it important?", difficulty: "medium", category: "research" },
      { id: 6, question: "What is the purpose of a design system?", difficulty: "medium", category: "design" },
      { id: 7, question: "How do you approach creating accessible designs?", difficulty: "medium", category: "accessibility" },
      { id: 8, question: "What tools do you use for design work?", difficulty: "easy", category: "tools" },
      { id: 9, question: "What is a prototype and why is it useful?", difficulty: "easy", category: "process" },
      { id: 10, question: "How do you handle feedback on your designs?", difficulty: "medium", category: "process" }
    ],
    experienced: [
      { id: 1, question: "How do you balance business goals with user needs in your design process?", difficulty: "hard", category: "strategy" },
      { id: 2, question: "Describe a challenging design problem you solved and your approach.", difficulty: "hard", category: "problem solving" },
      { id: 3, question: "How do you measure the success of a design?", difficulty: "hard", category: "analytics" },
      { id: 4, question: "What research methods do you employ before starting a design project?", difficulty: "medium", category: "research" },
      { id: 5, question: "How do you approach designing for different platforms (web, mobile, etc.)?", difficulty: "medium", category: "design" },
      { id: 6, question: "How do you ensure consistency across a product's design?", difficulty: "medium", category: "design" },
      { id: 7, question: "Describe your process for user testing and incorporating feedback.", difficulty: "medium", category: "research" },
      { id: 8, question: "How do you design for different user skill levels?", difficulty: "hard", category: "ux" },
      { id: 9, question: "How do you advocate for design decisions to non-design stakeholders?", difficulty: "medium", category: "communication" },
      { id: 10, question: "What trends in UI/UX design do you find interesting or concerning?", difficulty: "medium", category: "industry" }
    ]
  }
};

export default questionBank;
