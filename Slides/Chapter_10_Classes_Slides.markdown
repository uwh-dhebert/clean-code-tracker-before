# Clean Code Book Club: Chapter 10 - Classes (Detailed Slides)

These slides cover Chapter 10 of *Clean Code* by Robert C. Martin, focusing on designing clean, cohesive classes. Each slide addresses a major talking point, with quotes, explanations, benefits, and before/after code examples in C#, JavaScript/TypeScript, Python, and Data Engineering contexts (Databricks, Snowflake). Naming conventions (Camel Case, Pascal Case, Snake Case) tie to Chapters 2-9. A takeaways and next steps slide guides your book club. Visual suggestions include italicized quotes, syntax-highlighted code, red (#F44336) for bad examples, green (#4CAF50) for good, and icons.

## Slide 1: Single Responsibility Principle (SRP)
- **Key Quote**: “A class should have only one reason to change.”
- **Explanation**: Classes should have a single responsibility, focusing on one task or concept to avoid mixing unrelated logic.
- **Benefits**: Improves maintainability; reduces coupling; simplifies testing.
- **Before (Bad)**: Multiple responsibilities.
  ```csharp
  // C#: Bad
  public class Order
  {
      public void CalculateTotal() { /* Calculate */ }
      public void SaveToDatabase() { /* Save */ }
      public void SendEmail() { /* Email */ }
  }
  ```
- **After (Good)**: Single responsibility (Pascal/camel case).
  ```csharp
  // C#: Good
  public class Order
  {
      public decimal CalculateTotal() { /* Calculate */ }
  }
  public class OrderRepository
  {
      public void Save(Order order) { /* Save */ }
  }
  public class EmailService
  {
      public void SendOrderEmail(Order order) { /* Email */ }
  }
  ```
- **Python Example (Databricks)**:
  ```python
  # Bad
  class Order:
      def calculate_total(self): pass
      def save_to_db(self): pass
      def send_email(self): pass
  # Good (snake case, Pascal case)
  class Order:
      def calculate_total(self): pass
  class OrderRepository:
      def save(self, order): pass
  class EmailService:
      def send_order_email(self, order): pass
  ```
- **Visual**: Puzzle piece icon for single responsibility; *Clean Code* book cover (150x200px, bottom center, caption: “*Clean Code* by Robert C. Martin”).

## Slide 2: Keep Classes Small
- **Key Quote**: “The first rule of classes is that they should be small.”
- **Explanation**: Classes should be small, with minimal methods and focused responsibilities. Split large classes into smaller ones.
- **Benefits**: Easier to understand, maintain, and test.
- **Before (Bad)**: Large class.
  ```javascript
  // JS: Bad
  class OrderManager {
      constructor() { /* Initialize */ }
      calculateTotal() { /* Calculate */ }
      saveOrder() { /* Save */ }
      sendEmail() { /* Email */ }
      validateOrder() { /* Validate */ }
      printReceipt() { /* Print */ }
  }
  ```
- **After (Good)**: Smaller classes (camel case, Pascal case).
  ```javascript
  // JS: Good
  class Order {
      calculateTotal() { /* Calculate */ }
      validate() { /* Validate */ }
  }
  class OrderRepository {
      save(order) { /* Save */ }
  }
  class EmailService {
      sendOrderEmail(order) { /* Email */ }
  }
  ```
- **Python Example (Databricks)**:
  ```python
  # Bad
  class OrderManager:
      def calculate_total(self): pass
      def save_order(self): pass
      def send_email(self): pass
  # Good
  class Order:
      def calculate_total(self): pass
  class OrderRepository:
      def save_order(self, order): pass
  ```
- **Visual**: Scissors icon splitting large class.

## Slide 3: Organizing for Change
- **Key Quote**: “Classes should be open for extension but closed for modification.”
- **Explanation**: Design classes to allow extension (e.g., via interfaces) without modifying existing code (Open/Closed Principle).
- **Benefits**: Reduces risk of breaking changes; supports scalability.
- **Before (Bad)**: Modifies class directly.
  ```csharp
  // C#: Bad
  public class PaymentProcessor
  {
      public void Process(string type)
      {
          if (type == "Credit") { /* Credit logic */ }
          else if (type == "PayPal") { /* PayPal logic */ }
      }
  }
  ```
- **After (Good)**: Open for extension (Pascal/camel case).
  ```csharp
  // C#: Good
  public interface IPaymentProcessor
  {
      void Process();
  }
  public class CreditPaymentProcessor : IPaymentProcessor
  {
      public void Process() { /* Credit logic */ }
  }
  public class PayPalPaymentProcessor : IPaymentProcessor
  {
      public void Process() { /* PayPal logic */ }
  }
  ```
- **JavaScript Example**:
  ```javascript
  // Bad
  class PaymentProcessor {
      process(type) {
          if (type === 'Credit') { /* Credit */ }
          else if (type === 'PayPal') { /* PayPal */ }
      }
  }
  // Good
  class CreditPaymentProcessor {
      process() { /* Credit */ }
  }
  class PayPalPaymentProcessor {
      process() { /* PayPal */ }
  }
  ```
- **Visual**: Lock icon for closed, arrow for open extension.

## Slide 4: Maintaining Cohesion
- **Key Quote**: “Classes should have a small number of instance variables.”
- **Explanation**: High cohesion means most methods use most instance variables. Split classes if variables/methods are unrelated.
- **Benefits**: Focused classes; easier to maintain and test.
- **Before (Bad)**: Low cohesion.
  ```python
  # Python: Bad
  class UserManager:
      def __init__(self):
          self.user_id = None
          self.user_name = None
          self.order_total = None
      def save_user(self): pass
      def calculate_order(self): pass
  ```
- **After (Good)**: High cohesion (snake case, Pascal case).
  ```python
  # Python: Good
  class User:
      def __init__(self, id, name):
          self._id = id
          self._name = name
      def save(self): pass
  class Order:
      def __init__(self, total):
          self._total = total
      def calculate(self): pass
  ```
- **C# Example**:
  ```csharp
  // Bad
  public class UserManager
  {
      public int UserId;
      public string UserName;
      public decimal OrderTotal;
      public void SaveUser() { }
      public void CalculateOrder() { }
  }
  // Good
  public class User
  {
      private int id;
      private string name;
      public void Save() { }
  }
  public class Order
  {
      private decimal total;
      public void Calculate() { }
  }
  ```
- **Visual**: Tight-knit group icon for cohesion.

## Slide 5: Managing Dependencies
- **Key Quote**: “Classes should depend on abstractions, not on concrete implementations.”
- **Explanation**: Use dependency injection or interfaces to reduce coupling between classes, making them easier to change or test.
- **Benefits**: Improves testability; reduces ripple effects from changes.
- **Before (Bad)**: Tight coupling.
  ```javascript
  // JS: Bad
  class OrderService
  {
      constructor() {
          this.db = new ConcreteDatabase();
      }
      saveOrder(order) { this.db.save(order); }
  }
  ```
- **After (Good)**: Dependency injection (camel case, Pascal case).
  ```javascript
  // JS: Good
  class OrderService
  {
      #database;
      constructor(database) {
          this.#database = database;
      }
      saveOrder(order) { this.#database.save(order); }
  }
  ```
- **Python Example (Databricks)**:
  ```python
  # Bad
  class OrderService:
      def __init__(self):
          self.db = ConcreteDatabase()
      def save_order(self, order): self.db.save(order)
  # Good
  class OrderService:
      def __init__(self, database):
          self._database = database
      def save_order(self, order): self._database.save(order)
  ```
- **Visual**: Chain-link icon broken for reduced coupling.

## Slide 6: Takeaways & Next Steps
- **Key Quote**: “Classes should be small, single-purpose, and loosely coupled.”
- **Key Takeaways**:
  - **Single Responsibility Principle**: Classes should have one reason to change (e.g., split `OrderManager` into `Order`, `OrderRepository`).
  - **Small Classes**: Keep classes focused with minimal methods.
  - **Open/Closed Principle**: Design for extension, not modification.
  - **Cohesion**: Ensure methods use most instance variables.
  - **Dependencies**: Use abstractions (e.g., interfaces, dependency injection) to reduce coupling.
  - **Conventions**:
    - **C#**: Pascal for methods (`SaveOrder`), camel for variables (`orderId`).
    - **JS/TS**: Camel for methods (`saveOrder`), Pascal for classes (`OrderService`).
    - **Python**: Snake for methods (`save_order`), Pascal for classes (`OrderService`).
    - **Databricks/Snowflake**: Snake for Python