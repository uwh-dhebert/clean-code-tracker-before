import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

let chapters = [
    { id: 1, title: 'Clean Code',slide: 'Chapter_1_Naming_Conventions_Slides.markdown' , summary: 'Establishes the importance of writing clean code for project success, discussing code rot and the Boy Scout Rule.', cliffnotes: ['Clean code is elegant, efficient, readable.', 'Boy Scout Rule: leave code cleaner than found.', 'Code rot leads to unmaintainable systems.'], read: false, notes: [], details: 'This chapter introduces the concept of clean code and its critical role in the success of software projects. Robert C. Martin explains that clean code is readable, simple, and elegant, allowing other developers to understand and enhance it easily. It discusses "code rot" or the degradation of code over time due to poor practices, leading to increased maintenance costs and decreased productivity. The Boy Scout Rule is introduced as a principle to always leave the code cleaner than you found it, promoting incremental improvements. The chapter includes insights from industry experts on what constitutes clean code, emphasizing readability and minimalism. Key points include the consequences of bad code, technical debt, and the mindset needed to prioritize clean code.' },
    { id: 2, title: 'Meaningful Names', slide:'Chapter_2_Slides_With_Takeaways.markdown', summary: 'Emphasizes clear, descriptive names for variables, functions, and classes to enhance readability.', cliffnotes: ['Use intention-revealing names.', 'Avoid disinformation, abbreviations.' , 'Names should reflect purpose and context.'], read: false, notes: [], details: 'This chapter stresses the importance of choosing names that reveal intent, making code self-explanatory without needing comments. Names should be descriptive, avoid misleading terms, and be pronounceable for easy discussion. Avoid abbreviations unless widely understood, and ensure names make meaningful distinctions. Class names should be nouns, method names verbs. Consistent use of terms for concepts is crucial. Examples include renaming a variable from "d" to "daysSinceCreation" to convey meaning clearly. The chapter encourages renaming as understanding evolves, improving code quality over time.' },
    { id: 3, title: 'Functions', slide:'Chapter_3_Functions_Slides.markdown', summary: 'Describes how to write functions that are small, do one thing, and have clear arguments.', cliffnotes: ['Functions should be short, focused.', 'Do one thing well.', 'Minimize arguments, avoid side effects.'], read: false, notes: [], details: 'Functions should be small and do one thing at a single level of abstraction, making them easy to read and test. Descriptive names should indicate what the function does. Limit arguments to zero or one ideally, up to three max, and avoid flag arguments by splitting functions. Avoid side effects to prevent unexpected behavior. Prefer exceptions over error codes for error handling. Follow DRY to avoid duplication. Examples include refactoring a long function into smaller ones, each handling a specific task like validation or processing.' },
    { id: 4, title: 'Comments', slide:'Chapter_4_Comments_Slides_With_New_Quote.markdown', summary: 'Discusses when and how to use comments effectively, emphasizing they should not compensate for bad code.', cliffnotes: ['Good code is self-documenting.', 'Use comments for intent, not redundancy.', 'Avoid misleading or outdated comments.'], read: false, notes: [], details: 'Comments should explain intent or provide context where code cannot, but not compensate for unclear code. Good comments include legal notices, explanations of intent, warnings, and TODOs. Bad comments are redundant, misleading, or outdated. The goal is to make code so expressive that comments are minimal. Examples include using comments for complex regex explanations but avoiding comments that repeat code logic, like // increment i instead of i++.' },
    { id: 5, title: 'Formatting', slide:'Chapter_5_Formatting_Slides.markdown', summary: 'Covers code formatting rules to improve readability and consistency across a codebase.', cliffnotes: ['Use consistent indentation, spacing.', 'Group related code vertically.', 'Small files are easier to understand.'], read: false, notes: [], details: 'Formatting enhances readability and conveys professionalism. Use consistent indentation, limit line length, and group related code vertically. Separate concepts with blank lines. Follow the newspaper metaphor: high-level at top, details below. Team-wide formatting rules ensure consistency. Examples include using vertical closeness for dependent functions and horizontal alignment for assignment statements.' },
    { id: 6, title: 'Objects and Data Structures', slide:'Chapter_6_Objects_Data_Structures_Slides.markdown', summary: 'Explains the difference between objects and data structures, advocating for appropriate use.', cliffnotes: ['Objects hide data, expose behavior.', 'Data structures expose data, no behavior.', 'Choose based on use case.'], read: false, notes: [], details: 'Objects hide data behind abstractions and expose methods, while data structures expose data with no methods. Use objects for behavior, data structures for data transfer. Follow the Law of Demeter to avoid train wrecks of method chains. Examples include using DTOs for database interactions and objects for business logic, ensuring loose coupling.' },
    { id: 7, title: 'Error Handling', slide:'Chapter_7_Error_Handling_Slides.markdown', summary: 'Details best practices for handling errors to ensure robust and maintainable code.', cliffnotes: ['Use exceptions, not return codes.', 'Provide context in exceptions.', 'Define clear error boundaries.'], read: false, notes: [], details: 'Use unchecked exceptions over return codes for error handling to separate concerns. Provide meaningful messages and context in exceptions. Define error handling boundaries, like wrappers for third-party APIs. Avoid null returns; use exceptions or special objects. Examples include throwing an exception in a try-catch block with logging, rather than returning error codes that clutter calling code.' },
    { id: 8, title: 'Boundaries', slide:'Chapter_8_Boundaries_Slides.markdown', summary: 'Discusses managing third-party code and creating clean interfaces to external systems.', cliffnotes: ['Encapsulate third-party code.', 'Use adapters for flexibility.', 'Test boundary interfaces thoroughly.'], read: false, notes: [], details: 'Encapsulate third-party code in wrappers to minimize dependencies and enable testing. Use adapters to isolate interfaces. Test boundaries to ensure stability. Examples include wrapping a third-party logging library in a custom interface to allow swapping without changing application code.' },
    { id: 9, title: 'Unit Tests', slide:'Chapter_9_Unit_Tests_Slides.markdown', summary: 'Emphasizes the importance of writing clean, maintainable unit tests to ensure code quality.', cliffnotes: ['Tests should be fast, independent.', 'One assert per test.', 'Follow FIRST principles.'], read: false, notes: [], details: 'Unit tests should be clean, readable, and follow the same standards as production code. Tests enable refactoring without fear. Follow FIRST: Fast, Independent, Repeatable, Self-validating, Timely. One concept per test, single assert. Examples include writing tests that read like documentation, using BUILD-OPERATE-CHECK pattern.' },
    { id: 10, title: 'Classes', slide:'Chapter_10_Classes_Slides.markdown', summary: 'Describes how to design classes that are cohesive, small, and follow SOLID principles.', cliffnotes: ['Classes should be small, single-purpose.', 'Follow Single Responsibility Principle.', 'Minimize dependencies.'], read: false, notes: [], details: 'Classes should be small and have a single responsibility (SRP). High cohesion, low coupling. Use open-closed principle for extensibility. Examples include splitting a large class into smaller ones, each handling one aspect, like separating UI from business logic.' },
    { id: 11, title: 'Systems', slide:'Chapter_11_Systems_Slides.markdown', summary: 'Explores how to build systems with clean architecture and separation of concerns.', cliffnotes: ['Separate construction from use.', 'Use dependency injection.', 'Scale via abstraction.'], read: false, notes: [], details: 'Separate system construction from use with factories or DI. Use aspect-oriented programming for cross-cutting concerns. Scale by deferring decisions. Examples include using DI containers to manage object creation, allowing easy testing and configuration.' },
    { id: 12, title: 'Emergence', slide:'Chapter_12_Emergence_Slides.markdown', summary: 'Discusses how good design emerges from simple rules and refactoring practices.', cliffnotes: ['Follow simple design rules.', 'Refactor to eliminate duplication.', 'Express intent clearly.'], read: false, notes: [], details: 'Good designs emerge from following Kent Beck\'s rules: runs tests, no duplication, expresses intent, minimizes classes/methods. Continuous refactoring is key. Examples include removing duplicate code by extracting methods, improving names to express intent.' },
    { id: 13, title: 'Concurrency', slide:'Chapter_13_Concurrency_Slides.markdown', summary: 'Covers challenges and best practices for writing clean concurrent code.', cliffnotes: ['Concurrency is hard, error-prone.', 'Use synchronization primitives carefully.', 'Test concurrent code thoroughly.'], read: false, notes: [], details: 'Concurrency improves performance but is complex. Limit critical sections, use thread-safe collections. Test extensively for race conditions. Examples include using synchronized blocks for shared data access, avoiding shared mutable state where possible.' },
    { id: 14, title: 'Successive Refinement', slide:'Chapter_14_Successive_Refinement_Slides.markdown', summary: 'Illustrates iterative improvement of code through continuous refactoring.', cliffnotes: ['Refactor incrementally.', 'Maintain working code throughout.', 'Use tests to guide refactoring.'], read: false, notes: [], details: 'Shows a case study of refactoring code step by step, improving readability and structure while keeping it working. Emphasizes small changes backed by tests. Examples include starting with working but messy code, then extracting methods, improving names, removing duplication.' },
    { id: 15, title: 'JUnit Internals', slide:'Chapter_15_JUnit_Internals_Slides.markdown', summary: 'Analyzes the JUnit framework’s code to demonstrate clean code principles.', cliffnotes: ['Study good code examples.', 'Apply clean code principles.', 'Simplicity enhances maintainability.'], read: false, notes: [], details: 'Examines JUnit source code as an example of clean code. Discusses how it applies principles like small classes, meaningful names. Examples include analyzing the Command pattern in JUnit\'s test execution.' },
    { id: 16, title: 'Refactoring SerialDate', slide:'Chapter_16_SerialDate_Refactoring_Slides.markdown', summary: 'Walks through refactoring a real-world codebase to improve its quality.', cliffnotes: ['Refactor systematically.', 'Preserve functionality during changes.', 'Improve readability, structure.'], read: false, notes: [], details: 'A detailed walkthrough of refactoring the SerialDate class from JCommon library. Steps include adding tests, renaming, removing duplication, simplifying logic. Demonstrates how to clean up legacy code safely.' },
    { id: 17, title: 'Smells and Heuristics', slide:'Chapter_17_Smells_Heuristics_Slides.markdown', summary: 'Lists common code smells and heuristics for identifying and fixing bad code.', cliffnotes: ['Identify smells like duplication, complexity.', 'Apply heuristics for improvement.', 'Prioritize clarity, simplicity.'], read: false, notes: [], details: 'Catalogs code smells in categories like comments, environment, functions, names, tests. Provides heuristics to fix them, such as don\'t return null, use bounded generics. Examples include avoiding magic numbers by using constants, ensuring tests are readable.' }
];

const PORT = 3001;

app.get('/api/chapters/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const chapter = chapters.find(c => c.id === id);
    if (chapter) res.json(chapter);
    else res.status(404).json({ error: 'Chapter not found' });
});

app.get('/api/chapters', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = start < chapters.length ? chapters.slice(start, end) : [];


    setTimeout(() => {
        res.json({ data, total: chapters.length });
    }, 5000);
});

app.get('/api/slide/:filename', (req, res) => {
    const filename = req.params.filename;
    const slidesPath = path.join(__dirname, 'Slides', filename);

    fs.readFile(slidesPath, 'utf8', (err, data) => {
        if (err) {
            res.status(404).send('File not found');
        } else {
            res.type('text/plain').send(data);
        }
    });
});

app.patch('/api/chapters/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const chapter = chapters.find(c => c.id === id);
    if (chapter) {
        chapter.read = req.body.read;
        res.json(chapter);
    } else res.status(404).json({ error: 'Chapter not found' });
});

app.post('/api/chapters/:id/notes', (req, res) => {
    const id = parseInt(req.params.id);
    const chapter = chapters.find(c => c.id === id);
    if (chapter) {
        chapter.notes.push(req.body.note);
        res.json(chapter);
    } else res.status(404).json({ error: 'Chapter not found' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));