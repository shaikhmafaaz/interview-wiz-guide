
import random

# Topic-specific concepts to fill in the templates
topic_concepts = {
    'javascript': [
        'promises', 'async/await', 'closures', 'prototypes', 
        'event bubbling', 'hoisting', 'the event loop', 'ES6 modules',
        'arrow functions', 'this keyword', 'destructuring', 'const/let',
        'callbacks', 'map/reduce', 'DOM manipulation', 'TypeScript'
    ],
    'python': [
        'generators', 'decorators', 'context managers', 'list comprehensions',
        'virtual environments', 'dictionaries', 'lambdas', 'magic methods',
        'multiple inheritance', 'asyncio', 'type hints', 'unittest/pytest',
        'pandas', 'numpy', 'Django', 'Flask'
    ],
    'react': [
        'hooks', 'context API', 'render props', 'HOCs', 'Redux',
        'virtual DOM', 'memo', 'useEffect', 'useState', 'useReducer',
        'prop drilling', 'JSX', 'styled components', 'Suspense',
        'error boundaries', 'React Router'
    ],
    'data science': [
        'regression', 'classification', 'clustering', 'dimensionality reduction',
        'cross-validation', 'feature engineering', 'ensemble methods', 'neural networks',
        'overfitting', 'bias-variance tradeoff', 'ROC curves', 'hypothesis testing',
        'pandas', 'scikit-learn', 'TensorFlow', 'data visualization'
    ],
    'design': [
        'color theory', 'typography', 'grid systems', 'wireframing',
        'user personas', 'A/B testing', 'accessibility', 'responsive design',
        'design systems', 'UI components', 'usability testing', 'information architecture',
        'prototyping', 'user flows', 'material design', 'atomic design'
    ]
}

# Define question templates for different topics
question_templates = {
    'javascript': [
        'What is the difference between {0} and {1} in JavaScript?',
        'How would you implement {0} using {1}?',
        'Explain how {0} works under the hood.',
        'What are the best practices when working with {0}?',
        'How would you debug an issue with {0}?',
        'Compare {0} and {1} approaches in JavaScript.',
        'When would you use {0} instead of {1}?',
        'Write a function that implements {0}.',
        'What are common pitfalls when using {0}?',
        'How has {0} changed in recent JavaScript versions?'
    ],
    'python': [
        'What is the difference between {0} and {1} in Python?',
        'How would you implement {0} using {1}?',
        'Explain how {0} works in Python.',
        'What are the best practices when working with {0} in Python?',
        'How would you optimize a function that uses {0}?',
        'Compare {0} and {1} approaches in Python.',
        'When should you use {0} instead of {1}?',
        'Write a Python function that implements {0}.',
        'What are common mistakes when using {0} in Python?',
        'How does {0} differ between Python 2 and Python 3?'
    ],
    'react': [
        'How would you implement {0} in a React component?',
        'What is the purpose of {0} in React?',
        'Compare {0} and {1} patterns in React development.',
        'How would you optimize a React component that uses {0}?',
        'Explain the lifecycle methods related to {0}.',
        'What are the best practices when working with {0} in React?',
        'How would you test a React component that uses {0}?',
        'When would you use {0} instead of {1} in React?',
        'How has {0} changed in recent React versions?',
        'What are common mistakes when implementing {0} in React?'
    ],
    'data science': [
        'How would you use {0} for {1} analysis?',
        'What are the limitations of {0} in data processing?',
        'Compare {0} and {1} algorithms for data analysis.',
        'How would you optimize a {0} model for better performance?',
        'Explain how {0} works in the context of machine learning.',
        'What data preprocessing steps are necessary before applying {0}?',
        'When would you choose {0} over {1} for data analysis?',
        'How would you evaluate the performance of a {0} model?',
        'What are common pitfalls when implementing {0} for data analysis?',
        'How has {0} evolved in recent years in data science?'
    ],
    'design': [
        'How would you approach designing a {0} for {1}?',
        'What are the key considerations when creating a {0}?',
        'Compare {0} and {1} design methodologies.',
        'How would you test the usability of a {0} design?',
        'Explain the importance of {0} in user interface design.',
        'What accessibility concerns should be addressed when designing a {0}?',
        'When would you choose {0} over {1} in a design system?',
        'How would you implement {0} in a responsive design?',
        'What are common mistakes when designing {0}?',
        'How have design trends for {0} changed in recent years?'
    ]
}

def generate_interview_questions(topic, difficulty):
    """Generate interview questions based on topic and difficulty"""
    
    # Default to javascript if topic not found
    if topic.lower() not in topic_concepts:
        topic = 'javascript'
    else:
        topic = topic.lower()
    
    # Choose templates based on difficulty
    if difficulty.lower() == 'easy':
        num_questions = 5
        complexity_factor = 0.3  # Simpler questions
    elif difficulty.lower() == 'medium':
        num_questions = 5
        complexity_factor = 0.6  # Moderate complexity
    else:  # hard
        num_questions = 5
        complexity_factor = 1.0  # Full complexity
    
    questions = []
    templates = question_templates[topic]
    concepts = topic_concepts[topic]
    
    used_templates = set()
    while len(questions) < num_questions and len(used_templates) < len(templates):
        template_idx = random.randint(0, len(templates) - 1)
        
        # Ensure we don't repeat templates
        if template_idx in used_templates:
            continue
            
        used_templates.add(template_idx)
        template = templates[template_idx]
        
        # Choose random concepts to fill the template
        concept1 = random.choice(concepts)
        concept2 = random.choice([c for c in concepts if c != concept1])
        
        question = template.format(concept1, concept2)
        questions.append(question)
    
    return questions, topic, difficulty
