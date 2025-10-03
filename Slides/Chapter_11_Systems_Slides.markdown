# Clean Code Book Club: Chapter 11 - Systems (Detailed Slides)

These slides cover Chapter 11 of *Clean Code* by Robert C. Martin, focusing on designing clean, maintainable software systems through separation of concerns, abstraction, and dependency management. Each slide addresses a major talking point, with quotes, explanations, benefits, and before/after code examples in C#, JavaScript/TypeScript, Python, and Data Engineering contexts (Databricks, Snowflake). Naming conventions (Camel Case, Pascal Case, Snake Case) tie to Chapters 2-10. A takeaways and next steps slide guides your book club. Visual suggestions include italicized quotes, syntax-highlighted code, red (#F44336) for bad examples, green (#4CAF50) for good, and icons.

## Slide 1: Separate Construction from Use
- **Key Quote**: “Separate the construction of your objects from their use.”
- **Explanation**: Object creation (construction) should be distinct from business logic (use) to improve modularity and testability. Use factories or dependency injection to manage construction.
- **Benefits**: Enhances flexibility; simplifies testing; decouples initialization.
- **Before (Bad)**: Construction mixed with use.
  ```csharp
  // C#: Bad
  public class OrderService
  {
      private Database db = new ConcreteDatabase(); // Construction in use
      public void ProcessOrder(Order order)
      {
          db.Save(order);
      }
  }
  ```
- **After (Good)**: Separated construction (Pascal/camel case).
  ```csharp
  // C#: Good
  public class OrderService
  {
      private readonly IDatabase db;
      public OrderService(IDatabase db) { this.db = db; } // Construction via DI
      public void ProcessOrder(Order order)
      {
          db.Save(order);
      }
  }
  ```
- **Python Example (Databricks)**:
  ```python
  # Bad
  class OrderService:
      def __init__(self):
          self.db = ConcreteDatabase()
      def process_order(self, order):
          self.db.save(order)
  # Good (snake case, Pascal case)
  class OrderService:
      def __init__(self, database):
          self._database = database
      def process_order(self, order):
          self._database.save(order)
  ```
- **Visual**: Split icon separating construction and use; *Clean Code* book cover (150x200px, bottom center, caption: “*Clean Code* by Robert C. Martin”).

## Slide 2: Factories
- **Key Quote**: “Factories are a way to encapsulate the creation of objects.”
- **Explanation**: Use factory classes or methods to centralize object creation, especially for complex objects, to isolate construction logic.
- **Benefits**: Simplifies object creation; supports abstraction; improves testability.
- **Before (Bad)**: Direct construction.
  ```javascript
  // JS: Bad
  class OrderService {
      constructor() {
          this.order = new Order(1, 100);
      }
      process() { this.order.save(); }
  }
  ```
- **After (Good)**: Factory pattern (camel case, Pascal case).
  ```javascript
  // JS: Good
  class OrderFactory {
      createOrder(id, amount) {
          return new Order(id, amount);
      }
  }
  class OrderService {
      #order;
      constructor(factory) {
          this.#order = factory.createOrder(1, 100);
      }
      process() { this.#order.save(); }
  }
  ```
- **Python Example (Databricks)**:
  ```python
  # Bad
  class OrderService:
      def __init__(self):
          self.order = Order(1, 100)
      def process(self): self.order.save()
  # Good
  class OrderFactory:
      def create_order(self, id, amount):
          return Order(id, amount)
  class OrderService:
      def __init__(self, factory):
          self._order = factory.create_order(1, 100)
      def process(self): self._order.save()
  ```
- **Visual**: Factory machine icon producing objects.

## Slide 3: Dependency Injection
- **Key Quote**: “Dependency injection is a powerful mechanism for separating construction from use.”
- **Explanation**: Inject dependencies (e.g., via constructor or method) rather than hardcoding them, reducing coupling and improving testability.
- **Benefits**: Enhances modularity; simplifies mocking in tests.
- **Before (Bad)**: Hardcoded dependency.
  ```csharp
  // C#: Bad
  public class DataProcessor
  {
      private Database db = new ConcreteDatabase();
      public void ProcessData(Data data) { db.Save(data); }
  }
  ```
- **After (Good)**: Dependency injection (Pascal/camel case).
  ```csharp
  // C#: Good
  public class DataProcessor
  {
      private readonly IDatabase db;
      public DataProcessor(IDatabase db) { this.db = db; }
      public void ProcessData(Data data) { db.Save(data); }
  }
  ```
- **JavaScript Example**:
  ```javascript
  // Bad
  class DataProcessor {
      constructor() {
          this.db = new ConcreteDatabase();
      }
      processData(data) { this.db.save(data); }
  }
  // Good
  class DataProcessor {
      #db;
      constructor(db) { this.#db = db; }
      processData(data) { this.#db.save(data); }
  }
  ```
- **Visual**: Syringe icon for injection.

## Slide 4: Scaling Up with Modularity
- **Key Quote**: “Systems should be composed of small, well-defined modules.”
- **Explanation**: Break systems into small, cohesive modules (e.g., classes, services) to manage complexity and enable scalability.
- **Benefits**: Easier to maintain, test, and extend.
- **Before (Bad)**: Monolithic system.
  ```python
  # Python: Bad
  class System:
      def process_order(self, order):
          # Validate, save, notify
          if order.is_valid():
              db.save(order)
              email.send(order)
  ```
- **After (Good)**: Modular design (snake case, Pascal case).
  ```python
  # Python: Good
  class OrderValidator:
      def validate(self, order): return order.is_valid()
  class OrderRepository:
      def save(self, order): db.save(order)
  class EmailService:
      def send_order_email(self, order): email.send(order)
  class OrderSystem:
      def __init__(self, validator, repository, email_service):
          self._validator = validator
          self._repository = repository
          self._email_service = email_service
      def process_order(self, order):
          if self._validator.validate(order):
              self._repository.save(order)
              self._email_service.send_order_email(order)
  ```
- **Snowflake Example**:
  ```sql
  -- Bad
  CREATE PROCEDURE process_order()
  BEGIN
      -- Validate, save, notify
      DECLARE valid BOOLEAN;
      SET valid = (SELECT COUNT(*) FROM orders WHERE id = :id);
      INSERT INTO orders ...;
      CALL send_email();
  END;
  -- Good
  CREATE PROCEDURE validate_order(id INT) RETURNS BOOLEAN;
  CREATE PROCEDURE save_order(...);
  CREATE PROCEDURE send_order_email(...);
  ```
- **Visual**: Building blocks icon for modularity.

## Slide 5: Separation of Concerns
- **Key Quote**: “Separate concerns to make your systems easier to understand and change.”
- **Explanation**: Divide system logic into distinct concerns (e.g., validation, persistence, notification) to avoid tangled code.
- **Benefits**: Improves maintainability; supports independent changes.
- **Before (Bad)**: Mixed concerns.
  ```javascript
  // JS: Bad
  class OrderManager {
      process(order) {
          if (order.amount > 0) {
              db.save(order);
              email.send(order);
          }
      }
  }
  ```
- **After (Good)**: Separated concerns (camel case, Pascal case).
  ```javascript
  // JS: Good
  class OrderValidator {
      validate(order) { return order.amount > 0; }
  }
  class OrderRepository {
      save(order) { db.save(order); }
  }
  class EmailService {
      sendOrderEmail(order) { email.send(order); }
  }
  class OrderManager {
      #validator;
      #repository;
      #emailService;
      constructor(validator, repository, emailService) {
          this.#validator = validator;
          this.#repository = repository;
          this.#emailService = emailService;
      }
      process(order) {
          if (this.#validator.validate(order)) {
              this.#repository.save(order);
              this.#emailService.sendOrderEmail(order);
          }
      }
  }
  ```
- **C# Example**:
  ```csharp
  // Bad
  public class OrderManager
  {
      public void Process(Order order)
      {
          if (order.Amount > 0) { db.Save(order); email.Send(order); }
      }
  }
  // Good
  public class OrderManager
  {
      private readonly IOrderValidator validator;
      private readonly IOrderRepository repository;
      private readonly IEmailService emailService;
      public OrderManager(IOrderValidator validator, IOrderRepository repository, IEmailService emailService)
      {
          this.validator = validator;
          this.repository = repository;
          this.emailService = emailService;
      }
      public void Process(Order order)
      {
          if (validator.Validate(order))
          {
              repository.Save(order);
              emailService.SendOrderEmail(order);
          }
      }
  }
  ```
- **Visual**: Divided layers icon for concerns.

## Slide 6: Takeaways & Next Steps
- **Key Quote**: “Clean systems separate concerns and encapsulate construction.”
- **Key Takeaways**:
  - **Separate Construction**: Isolate object creation from use (e.g., via dependency injection).
  - **Factories**: Centralize object creation for complex objects.
  - **Dependency Injection**: Inject dependencies to reduce coupling.
  - **Modularity**: Build systems from small, cohesive modules.
  - **Separation of Concerns**: Divide logic into distinct responsibilities.
  - **Conventions**:
    - **C#**: Pascal for methods (`ProcessOrder`), camel for variables (`orderId`).
    - **JS/TS**: Camel for methods (`processOrder`), Pascal for classes (`OrderManager`).
    - **Python**: Snake for methods (`process_order`), Pascal for classes (`OrderManager`).
    - **Databricks/Snowflake**: Snake for Python (`order_id`), uppercase/snake for SQL (`ORDER_ID`).
- **Next Steps for Book Club**:
  - **Code Audit**: Review your codebase for mixed construction/use or monolithic classes.
  - **Adopt Tools**: Use linters (e.g., ESLint for JS/TS, Pylint for Python, StyleCop for C#) and DI frameworks (e.g., .NET Core, InversifyJS) to enforce system design.
  - **Team Policy**: Agree on factory and DI patterns for system modularity.
  - **Practice**: Refactor a system to use factories or DI; share results.
  - **Next Chapter**: Read Chapter 12 (Emergence) and discuss how systems evolve cleanly.
- **Visual**: Checklist of system design principles; building blocks icon; green (#4CAF50) for good, red (#F44336) for bad; *Clean Code* book cover (150x200px, bottom center).