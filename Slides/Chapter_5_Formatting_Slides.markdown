# Clean Code Book Club: Chapter 5 - Formatting (Detailed Slides)

These slides cover Chapter 5 of *Clean Code* by Robert C. Martin, focusing on code formatting for readability and maintainability. Each slide addresses a major talking point, with quotes, explanations, benefits, and before/after code examples in C#, JavaScript/TypeScript, Python, and Data Engineering contexts (Databricks, Snowflake). Naming conventions (Camel Case, Pascal Case, Snake Case) tie to Chapters 2-4. A takeaways and next steps slide includes a feedback survey link/QR code for Chapters 1-5. Visual suggestions include italicized quotes, syntax-highlighted code, red (#F44336) for bad examples, green (#4CAF50) for good, and icons.

## Slide 1: Purpose of Code Formatting
- **Key Quote**: “Code formatting is about communication, and communication is the professional developer’s first order of business.”
- **Explanation**: Formatting makes code readable, revealing structure and intent. It’s critical for team collaboration and maintenance.
- **Benefits**: Enhances comprehension, reduces errors, and aligns with team standards.
- **Example (Before vs. After)**:
  ```csharp
  // C#: Bad (poor formatting)
  public class Order{public int CalculateTotal(int price,int quantity){return price*quantity;}}
  // Good (formatted, Pascal/camel case)
  public class Order
  {
      public int CalculateTotal(int price, int quantity)
      {
          return price * quantity;
      }
  }
  ```
- **Python Example (Databricks)**:
  ```python
  # Bad
  def calc_total(p,q):return p*q
  # Good (snake case)
  def calculate_total_price(price, quantity):
      return price * quantity
  ```
- **Visual**: Split screen: cluttered code (red) vs. formatted code (green); *Clean Code* book cover (150x200px, bottom center, caption: “*Clean Code* by Robert C. Martin”).

## Slide 2: Vertical Formatting
- **Key Quote**: “A file that is too long is as bad as a file that is too short.”
- **Explanation**: Files should be concise (ideally 200-500 lines), with related concepts grouped vertically. Use blank lines to separate logical sections (e.g., methods, imports).
- **Benefits**: Improves readability; makes files easier to navigate.
- **Before (Bad)**: No separation, long file.
  ```javascript
  // JS: Bad
  import { db } from './db';function getUser(id){let user=db.find(id);return user;}function saveUser(user){db.save(user);}
  ```
- **After (Good)**: Vertical separation (camel case).
  ```javascript
  // JS: Good
  import { db } from './db';

  function getUser(id) {
      let user = db.find(id);
      return user;
  }

  function saveUser(user) {
      db.save(user);
  }
  ```
- **Snowflake Example**:
  ```sql
  -- Bad
  CREATE TABLE users(id INT,name VARCHAR);INSERT INTO users VALUES(1,'John');
  -- Good
  CREATE TABLE users (
      id INT,
      name VARCHAR
  );

  INSERT INTO users
  VALUES (1, 'John');
  ```
- **Visual**: Vertical ruler icon showing proper spacing.

## Slide 3: The Newspaper Metaphor
- **Key Quote**: “Think of a well-written newspaper article. You read it vertically.”
- **Explanation**: Code should read like a newspaper: high-level concepts (e.g., class names) at the top, details (e.g., methods) below. Group related functions together.
- **Benefits**: Intuitive flow; readers grasp structure quickly.
- **Before (Bad)**: Disorganized.
  ```python
  # Python: Bad
  def save_user(u): db.save(u)
  class User: pass
  def get_user(id): return db.find(id)
  ```
- **After (Good)**: Top-down order (snake case, Pascal case).
  ```python
  # Python: Good
  class User:
      pass

  def get_user(user_id):
      return db.find(user_id)

  def save_user(user):
      db.save(user)
  ```
- **C# Example**:
  ```csharp
  // Bad
  public int CalculateTotal(int p, int q) { return p * q; } public class Order { }
  // Good
  public class Order
  {
      public int CalculateTotal(int price, int quantity)
      {
          return price * quantity;
      }
  }
  ```
- **Visual**: Newspaper layout with headline (class) and articles (methods).

## Slide 4: Vertical Openness Between Concepts
- **Key Quote**: “Each group of lines is separated by a blank line, which shows that they are separate concepts.”
- **Explanation**: Use blank lines to separate distinct ideas (e.g., imports, class definitions, methods) for visual clarity.
- **Benefits**: Clarifies logical boundaries; reduces cognitive load.
- **Before (Bad)**: No separation.
  ```javascript
  // JS: Bad
  import { db } from './db';class User{constructor(id,name){this.id=id;this.name=name;}}function getUser(id){return db.find(id);}
  ```
- **After (Good)**: Blank lines (camel case, Pascal case).
  ```javascript
  // JS: Good
  import { db } from './db';

  class User {
      constructor(id, name) {
          this.id = id;
          this.name = name;
      }
  }

  function getUser(id) {
      return db.find(id);
  }
  ```
- **Python Example (Databricks)**:
  ```python
  # Bad
  def process_data(df):df=df.filter(df["age"]>18);return df;def save_data(df):df.write("output.csv")
  # Good
  def process_data(df):
      df = df.filter(df["age"] > 18)
      return df

  def save_data(df):
      df.write("output.csv")
  ```
- **Visual**: Blank line dividers highlighted in green.

## Slide 5: Vertical Density for Related Concepts
- **Key Quote**: “Lines of code that are tightly related should appear vertically dense.”
- **Explanation**: Group closely related code (e.g., a method’s body) without blank lines to show cohesion.
- **Benefits**: Highlights tight relationships; avoids fragmentation.
- **Before (Bad)**: Unnecessary blank lines.
  ```csharp
  // C#: Bad
  public int CalculateTotal(int price, int quantity)
  {
      int total;

      total = price * quantity;

      return total;
  }
  ```
- **After (Good)**: Dense grouping (Pascal/camel case).
  ```csharp
  // C#: Good
  public int CalculateTotal(int price, int quantity)
  {
      int total = price * quantity;
      return total;
  }
  ```
- **Python Example (Databricks)**:
  ```python
  # Bad
  def calculate_total(price, quantity):

      total = price * quantity

      return total
  # Good
  def calculate_total(price, quantity):
      total = price * quantity
      return total
  ```
- **Visual**: Green highlight on dense code block.

## Slide 6: Vertical Distance
- **Key Quote**: “Concepts that are closely related should be kept vertically close to each other.”
- **Explanation**: Place dependent functions/classes near each other to show relationships; avoid scattering related code.
- **Benefits**: Reduces navigation effort; clarifies dependencies.
- **Before (Bad)**: Scattered code.
  ```javascript
  // JS: Bad
  function saveUser(user) { db.save(user); }
  // ... 100 lines later ...
  function getUser(id) { return db.find(id); }
  ```
- **After (Good)**: Close proximity (camel case).
  ```javascript
  // JS: Good
  function getUser(id) {
      return db.find(id);
  }

  function saveUser(user) {
      db.save(user);
  }
  ```
- **Snowflake Example**:
  ```sql
  -- Bad
  CREATE TABLE users (id INT);
  -- ... other tables ...
  INSERT INTO users VALUES (1);
  -- Good
  CREATE TABLE users (
      id INT
  );
  INSERT INTO users
  VALUES (1);
  ```
- **Visual**: Arrow showing close proximity of related code.

## Slide 7: Horizontal Formatting
- **Key Quote**: “How wide should a line be? I like to keep my lines at about 80 characters.”
- **Explanation**: Keep lines short (80-120 characters) for readability; avoid long lines that require scrolling.
- **Benefits**: Fits screens; easier to read side-by-side.
- **Before (Bad)**: Long line.
  ```python
  # Python: Bad
  def process_user_data(user_id, user_name, user_email, user_age, user_address, user_phone): return db.save(user_id, user_name, user_email, user_age, user_address, user_phone)
  ```
- **After (Good)**: Short lines (snake case).
  ```python
  # Python: Good
  def process_user_data(user_data):
      return db.save(
          user_data.id,
          user_data.name,
          user_data.email,
          user_data.age,
          user_data.address,
          user_data.phone
      )
  ```
- **C# Example**:
  ```csharp
  // Bad
  public User CreateUser(int id, string name, string email, int age, string address, string phone) { return new User(id, name, email, age, address, phone); }
  // Good
  public User CreateUser(UserData data)
  {
      return new User(
          data.Id,
          data.Name,
          data.Email,
          data.Age,
          data.Address,
          data.Phone
      );
  }
  ```
- **Visual**: Ruler icon showing 80-character limit.

## Slide 8: Horizontal Alignment
- **Key Quote**: “I don’t like horizontal alignment. It’s a maintenance nightmare.”
- **Explanation**: Avoid aligning code (e.g., variable assignments) with spaces, as it’s hard to maintain during changes.
- **Benefits**: Simplifies edits; focuses on readability.
- **Before (Bad)**: Aligned code.
  ```javascript
  // JS: Bad
  const id    = user.id;
  const name  = user.name;
  const email = user.email;
  ```
- **After (Good)**: No alignment (camel case).
  ```javascript
  // JS: Good
  const id = user.id;
  const name = user.name;
  const email = user.email;
  ```
- **Python Example (Databricks)**:
  ```python
  # Bad
  user_id     = df["id"]
  user_name   = df["name"]
  user_email  = df["email"]
  # Good
  user_id = df["id"]
  user_name = df["name"]
  user_email = df["email"]
  ```
- **Visual**: Crossed-out alignment grid.

## Slide 9: Indentation
- **Key Quote**: “A source file is a hierarchy rather like an outline.”
- **Explanation**: Use consistent indentation (e.g., 2-4 spaces) to show code hierarchy; avoid unindented or misaligned code.
- **Benefits**: Clarifies scope and structure; prevents errors.
- **Before (Bad)**: Poor indentation.
  ```csharp
  // C#: Bad
  public class Order{
  public int CalculateTotal(int price,int quantity){
  return price*quantity;}}
  ```
- **After (Good)**: Proper indentation (Pascal/camel case).
  ```csharp
  // C#: Good
  public class Order
  {
      public int CalculateTotal(int price, int quantity)
      {
          return price * quantity;
      }
  }
  ```
- **Python Example (Databricks)**:
  ```python
  # Bad
  def process_data(df):
  df = df.filter(df["age"]>18)
  return df
  # Good
  def process_data(df):
      df = df.filter(df["age"] > 18)
      return df
  ```
- **Visual**: Indentation levels highlighted with arrows.

## Slide 10: Team Rules
- **Key Quote**: “Every team should have its own formatting rules, and every member should follow them.”
- **Explanation**: Agree on formatting standards (e.g., indentation, line length) and enforce with linters/formatters (e.g., Prettier, Black).
- **Benefits**: Ensures consistency; reduces formatting disputes.
- **Before (Bad)**: Inconsistent team formatting.
  ```javascript
  // JS: Bad (mixed styles)
  function getUser(id) {return db.find(id);}
  function saveUser(user){
      db.save(user);
  }
  ```
- **After (Good)**: Consistent team style (camel case).
  ```javascript
  // JS: Good
  function getUser(id) {
      return db.find(id);
  }

  function saveUser(user) {
      db.save(user);
  }
  ```
- **Snowflake Example**:
  ```sql
  -- Bad (mixed)
  select id,name from users;CREATE TABLE temp(id INT);
  -- Good
  SELECT id, name
  FROM users;

  CREATE TABLE temp (
      id INT
  );
  ```
- **Visual**: Team handshake icon; linter logo (e.g., Prettier).

## Slide 11: Takeaways & Next Steps
- **Key Quote**: “Code formatting is about communication, and communication is the professional developer’s first order of business.”
- **Key Takeaways**:
  - **Purpose**: Formatting enhances readability and team collaboration.
  - **Vertical Formatting**: Keep files concise (200-500 lines), use blank lines for concepts, and group related code.
  - **Horizontal Formatting**: Limit lines to 80-120 characters; avoid alignment.
  - **Indentation & Team Rules**: Use consistent indentation; enforce team standards with linters.
  - **Conventions**:
    - **C#**: Pascal for methods (`CalculateTotal`), camel for variables (`totalPrice`).
    - **JS/TS**: Camel for functions (`getUser`), Pascal for classes (`UserProfile`).
    - **Python**: Snake for functions (`calculate_total`), Pascal for classes (`UserProfile`).
    - **Databricks/Snowflake**: Snake for Python (`total_price`), uppercase/snake for SQL (`TOTAL_PRICE`).
- **Next Steps for Book Club**:
  - **Complete Feedback Survey**: Share your thoughts on Chapters 1-5! [Insert QR Code or Link]
  - **Code Audit**: Review your codebase for formatting issues (e.g., inconsistent indentation, long lines).
  - **Adopt Tools**: Use linters/formatters (e.g., Prettier for JS/TS, Black for Python, StyleCop for C#) to enforce Chapter 5 rules.
  - **Team Policy**: Agree on formatting standards (e.g., 2-space indentation, 80-character lines).
  - **Practice**: Reformat a module to follow Chapter 5 principles; share results.
  - **Next Chapter**: Read Chapter 6 (Objects and Data Structures) and discuss how formatting aids OOP clarity.
- **Visual**: Checklist of formatting principles; linter logo; green (#4CAF50) for good, red (#F44336) for bad; *Clean Code* book cover (150x200px, bottom center); QR code for feedback survey.