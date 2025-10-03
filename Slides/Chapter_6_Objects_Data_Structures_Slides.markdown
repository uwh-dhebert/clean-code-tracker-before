# Clean Code Book Club: Chapter 6 - Objects and Data Structures (Detailed Slides)

These slides cover Chapter 6 of *Clean Code* by Robert C. Martin, focusing on the distinction between objects and data structures, emphasizing data abstraction, anti-symmetry, and the Law of Demeter. Each slide addresses a major talking point, with quotes, explanations, benefits, and before/after code examples in C#, JavaScript/TypeScript, Python, and Data Engineering contexts (Databricks, Snowflake). Naming conventions (Camel Case, Pascal Case, Snake Case) tie to Chapters 2-5. A takeaways and next steps slide includes a feedback survey link/QR code for Chapters 1-6. Visual suggestions include italicized quotes, syntax-highlighted code, red (#F44336) for bad examples, green (#4CAF50) for good, and icons.

## Slide 1: Data Abstraction
- **Key Quote**: “Hiding implementation is not just a matter of putting a layer of functions between the variables.”
- **Explanation**: Objects should hide data and expose behavior via methods, not just expose fields like data structures. Use abstraction to conceal implementation details.
- **Benefits**: Enhances maintainability; protects data integrity; simplifies interfaces.
- **Before (Bad)**: Exposes raw data (like a data structure).
  ```csharp
  // C#: Bad
  public class Point
  {
      public double X;
      public double Y;
  }
  ```
- **After (Good)**: Abstracts data (Pascal/camel case).
  ```csharp
  // C#: Good
  public class Point
  {
      private double x;
      private double y;
      public Point(double x, double y) { this.x = x; this.y = y; }
      public double GetX() { return x; }
      public double GetY() { return y; }
  }
  ```
- **Python Example (Databricks)**:
  ```python
  # Bad
  class Point:
      x = 0
      y = 0
  # Good (snake case, Pascal case)
  class Point:
      def __init__(self, x, y):
          self._x = x
          self._y = y
      def get_x(self): return self._x
      def get_y(self): return self._y
  ```
- **Visual**: Lock icon for abstraction; *Clean Code* book cover (150x200px, bottom center, caption: “*Clean Code* by Robert C. Martin”).

## Slide 2: Data/Object Anti-Symmetry
- **Key Quote**: “Objects hide their data behind abstractions and expose functions that operate on that data. Data structures expose their data and have no significant behavior.”
- **Explanation**: Objects (behavior-focused) and data structures (data-focused) serve opposite purposes. Choose based on need: objects for complex behavior, data structures for simple data.
- **Benefits**: Clarifies design intent; avoids hybrid confusion.
- **Before (Bad)**: Hybrid (data and behavior mixed).
  ```javascript
  // JS: Bad
  class Rectangle {
      constructor(width, height) {
          this.width = width;
          this.height = height;
      }
      area() { return this.width * this.height; } // Behavior in data structure
  }
  ```
- **After (Good)**: Clear object or data structure (camel case, Pascal case).
  ```javascript
  // JS: Good (Object)
  class Rectangle {
      #width;
      #height;
      constructor(width, height) {
          this.#width = width;
          this.#height = height;
      }
      getArea() { return this.#width * this.#height; }
  }
  // OR Good (Data Structure)
  const RectangleData = { width: 0, height: 0 };
  ```
- **Snowflake Example**:
  ```sql
  -- Bad (hybrid in stored proc)
  CREATE PROCEDURE calc_area()
  BEGIN
      DECLARE width INT DEFAULT 5;
      DECLARE height INT DEFAULT 10;
      RETURN width * height;
  END;
  -- Good (data-focused)
  CREATE TABLE rectangle_data (width INT, height INT);
  ```
- **Visual**: Venn diagram showing object vs. data structure separation.

## Slide 3: The Law of Demeter
- **Key Quote**: “A module should not know about the innards of the objects it manipulates.”
- **Explanation**: Don’t chain method calls or access nested objects (e.g., `obj.getX().getY()`). Call only methods on objects you directly own.
- **Benefits**: Reduces coupling; improves modularity.
- **Before (Bad)**: Violates Demeter (chained calls).
  ```csharp
  // C#: Bad
  public string GetManagerName(Employee emp)
  {
      return emp.Department.Manager.Name; // Accesses nested objects
  }
  ```
- **After (Good)**: Follows Demeter (Pascal/camel case).
  ```csharp
  // C#: Good
  public string GetManagerName(Employee emp)
  {
      return emp.GetManagerName(); // Delegate to Employee
  }
  ```
- **Python Example (Databricks)**:
  ```python
  # Bad
  def get_manager_name(emp):
      return emp.department.manager.name
  # Good (snake case)
  def get_manager_name(emp):
      return emp.get_manager_name()
  ```
- **Visual**: Chain-link icon crossed out for bad; single arrow for good.

## Slide 4: Data Transfer Objects (DTOs)
- **Key Quote**: “The quintessential form of a data structure is a class with public variables and no functions.”
- **Explanation**: DTOs are simple data containers for transferring data between layers (e.g., API responses). They expose data without behavior.
- **Benefits**: Simplifies data exchange; clear intent.
- **Before (Bad)**: DTO with behavior.
  ```javascript
  // JS: Bad
  class UserDTO {
      constructor(id, name) {
          this.id = id;
          this.name = name;
      }
      validate() { return this.name !== null; }
  }
  ```
- **After (Good)**: Pure DTO (camel case, Pascal case).
  ```javascript
  // JS: Good
  class UserDTO {
      constructor(id, name) {
          this.id = id;
          this.name = name;
      }
  }
  ```
- **Python Example (Databricks)**:
  ```python
  # Bad
  class UserDTO:
      def __init__(self, id, name):
          self.id = id
          self.name = name
      def validate(self): return self.name is not None
  # Good
  class UserDTO:
      def __init__(self, id, name):
          self.id = id
          self.name = name
  ```
- **Visual**: Envelope icon for data transfer.

## Slide 5: Active Record vs. Object
- **Key Quote**: “Active Record is a special case of a data structure that has some navigation methods.”
- **Explanation**: Active Records (e.g., ORM entities) combine data with behavior (e.g., save/load), but this can violate object principles. Prefer pure objects for complex logic.
- **Benefits**: Separates concerns; clarifies object vs. data structure roles.
- **Before (Bad)**: Active Record with logic.
  ```csharp
  // C#: Bad
  public class User
  {
      public int Id;
      public string Name;
      public void Save() { db.Save(this); }
      public bool IsValid() { return Name != null; }
  }
  ```
- **After (Good)**: Separate object and data (Pascal/camel case).
  ```csharp
  // C#: Good
  public class UserData
  {
      public int Id;
      public string Name;
  }
  public class User
  {
      private UserData data;
      public User(UserData data) { this.data = data; }
      public void Save() { db.Save(data); }
      public bool IsValid() { return data.Name != null; }
  }
  ```
- **Python Example (Databricks)**:
  ```python
  # Bad
  class User:
      def __init__(self, id, name):
          self.id = id
          self.name = name
      def save(self): db.save(self)
  # Good
  class UserData:
      def __init__(self, id, name):
          self.id = id
          self.name = name
  class User:
      def __init__(self, data): self.data = data
      def save(self): db.save(self.data)
  ```
- **Visual**: Split icon showing data vs. behavior.

## Slide 6: Takeaways & Next Steps
- **Key Quote**: “Objects expose behavior and hide data. Data structures expose data and have no significant behavior.”
- **Key Takeaways**:
  - **Data Abstraction**: Hide data behind methods (e.g., `GetX()` vs. public `x`).
  - **Anti-Symmetry**: Choose objects for behavior, data structures for data (e.g., DTOs).
  - **Law of Demeter**: Avoid chained calls (e.g., `emp.GetManagerName()` vs. `emp.Department.Manager.Name`).
  - **DTOs & Active Record**: Use DTOs for data transfer; separate behavior from data in Active Records.
  - **Conventions**:
    - **C#**: Pascal for methods (`GetName`), camel for variables (`userId`).
    - **JS/TS**: Camel for functions (`getUser`), Pascal for classes (`UserProfile`).
    - **Python**: Snake for functions (`get_user`), Pascal for classes (`UserProfile`).
    - **Databricks/Snowflake**: Snake for Python (`user_id`), uppercase/snake for SQL (`USER_ID`).
- **Next Steps for Book Club**:
  - **Complete Feedback Survey**: Share your thoughts on Chapters 1-6! [Insert QR Code or Link]
  - **Code Audit**: Review your codebase for object vs. data structure misuse (e.g., exposed fields, Demeter violations).
  - **Adopt Tools**: Use linters (e.g., ESLint for JS/TS, Pylint for Python, StyleCop for C#) to enforce encapsulation and naming.
  - **Team Policy**: Agree on object vs. DTO conventions and Demeter compliance.
  - **Practice**: Refactor a class to hide data or split Active Record logic; share results.
  - **Next Chapter**: Read Chapter 7 (Error Handling) and discuss how it integrates with objects.
- **Visual**: Checklist of principles; lock icon for abstraction; green (#4CAF50) for good, red (#F44336) for bad; *Clean Code* book cover (150x200px, bottom center); QR code for feedback survey.