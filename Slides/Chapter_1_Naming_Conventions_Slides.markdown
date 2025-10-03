# Clean Code Book Club: Chapter 2 - Meaningful Names
## Slide 1: Why Naming Conventions Matter
- **Chapter 2 Focus**: Names should reveal intent, be pronounceable, searchable, and avoid disinformation.
- **Naming Conventions**: Rules for formatting identifiers (variables, functions, classes) to ensure consistency and readability.
- **Conventions Covered**:
  - Camel Case: `myVariableName`
  - Pascal Case: `MyClassName`
  - Snake Case: `my_variable_name`
  - Kebab Case: `my-variable-name`
  - Lowercase: `myvariablename`
  - Uppercase: `MYCONSTANT`
  - Screaming Snake Case: `MY_CONSTANT_NAME`
- **Benefits**: Improves readability, reduces bugs, aligns with language idioms, and supports team collaboration.
- **Visual**: Use a table comparing conventions and a quote from Chapter 2: “The name of a variable, function, or class should answer why it exists, what it does, and how it is used.”

## Slide 2: Camel Case
- **Definition**: Lowercase first word, uppercase subsequent words (no separators). E.g., `totalCostInDollars`.
- **Preferred By**:
  - **C#**: Local variables, parameters, private fields (Microsoft .NET guidelines).
  - **JavaScript/TypeScript**: Variables, functions, properties (Airbnb/Google style guides).
  - **Python**: Rarely used (PEP 8 prefers snake case).
  - **Data Engineering**: Databricks (Python context: rare); Snowflake (SQL: not common).
- **Benefits**:
  - Compact, readable for multi-word names.
  - Matches C#/.NET and JS/TS ecosystems (e.g., `string.Join`, `useState`).
  - Drawback: Acronyms can be ambiguous (e.g., `xmlHttpRequest` vs. `XMLHTTPRequest`).
- **Before (Bad Naming)**: Vague, non-descriptive names (Chapter 2: “Avoid Disinformation”).
  ```javascript
  // JavaScript: Bad
  let x = 100; // What is x?
  function calc(a, b) { // What does calc do?
    return a * b;
  }
  ```
- **After (Good Naming)**: Clear, follows camel case.
  ```javascript
  // JavaScript: Good
  let totalPrice = 100; // Clear intent
  function calculateTotalCost(price, quantity) { // Descriptive, camel case
    return price * quantity;
  }
  ```
- **Visual**: Highlight `x` vs. `totalPrice` in red/green to show clarity improvement.

## Slide 3: Pascal Case
- **Definition**: Uppercase first letter of each word (no separators). E.g., `TotalCostInDollars`.
- **Preferred By**:
  - **C#**: Classes, methods, properties (Microsoft guidelines).
  - **JavaScript/TypeScript**: Classes, React components.
  - **Python**: Classes (PEP 8).
  - **Data Engineering**: Databricks (Scala classes); Snowflake (SQL table names).
- **Benefits**:
  - Signals types (classes vs. variables).
  - Matches C# BCL (e.g., `System.String`) and Python/JS conventions for classes.
  - Drawback: Overuse for non-types can confuse (e.g., variables in Pascal).
- **Before (Bad Naming)**: Inconsistent, unclear intent.
  ```csharp
  // C#: Bad
  public class calc { // Lowercase, vague
    public int x(int a, int b) { // Non-descriptive
      return a + b;
    }
  }
  ```
- **After (Good Naming)**: Clear, follows Pascal case.
  ```csharp
  // C#: Good
  public class OrderCalculator { // Pascal, descriptive
    public int CalculateTotal(int price, int quantity) { // Pascal, clear intent
      return price * quantity;
    }
  }
  ```
- **Visual**: Show side-by-side code with Pascal case highlighted in blue.

## Slide 4: Snake Case
- **Definition**: All lowercase, words separated by underscores. E.g., `total_cost_in_dollars`.
- **Preferred By**:
  - **C#**: Rarely used.
  - **JavaScript/TypeScript**: Sometimes for constants or file names.
  - **Python**: Variables, functions, modules (PEP 8 standard).
  - **Data Engineering**: Databricks (PySpark variables, DataFrame columns); Snowflake (SQL columns).
- **Benefits**:
  - Highly readable (underscores separate words clearly).
  - Python standard (PEP 8); common in SQL for query clarity.
  - Drawback: Underscores slow typing slightly.
- **Before (Bad Naming)**: Non-standard, hard to read.
  ```python
  // Python: Bad
  totalcost = 100 # No word separation
  def calcTotal(p, q): # Non-descriptive, camel case in Python
      return p * q
  ```
- **After (Good Naming)**: PEP 8-compliant, clear.
  ```python
  // Python: Good
  total_cost = 100 # Snake case, clear
  def calculate_total_cost(price, quantity): # Descriptive, snake case
      return price * quantity
  ```
- **Visual**: Use a green checkmark for PEP 8 compliance.

## Slide 5: Kebab Case
- **Definition**: All lowercase, words separated by hyphens. E.g., `total-cost-in-dollars`.
- **Preferred By**:
  - **C#**: Rare; used in URLs or configs.
  - **JavaScript/TypeScript**: CSS classes, HTML attributes, file names (e.g., `user-profile.tsx`).
  - **Python**: Not in code; used in URLs or package names.
  - **Data Engineering**: Databricks (notebook file names); Snowflake (API URLs).
- **Benefits**:
  - URL-safe, readable for non-code contexts (e.g., CSS, URLs).
  - Standard in web dev (JS/TS/CSS).
  - Drawback: Invalid in most languages’ identifiers (hyphen = minus).
- **Before (Bad Naming)**: Inconsistent, unclear in context.
  ```javascript
  // JavaScript (CSS): Bad
  const styles = {
    userprofile: { backgroundColor: 'blue' } // No separation, ambiguous
  };
  ```
- **After (Good Naming)**: Clear, follows kebab case.
  ```javascript
  // JavaScript (CSS): Good
  const styles = {
    'user-profile': { backgroundColor: 'blue' } // Kebab case, clear
  };
  ```
- **Visual**: Show CSS class in browser rendering to contrast readability.

## Slide 6: Lowercase, Uppercase, Screaming Snake Case
- **Lowercase**: All lowercase, no separators. E.g., `totalcostindollars`.
  - **Preferred By**: Python/JS for short vars; rare in production.
  - **Benefits**: Fast to type. Drawback: Poor readability for long names.
- **Uppercase**: All uppercase, no separators. E.g., `TOTALCOST`.
  - **Preferred By**: Legacy code or acronyms. Drawback: “Shouts,” hard to read.
- **Screaming Snake Case**: Uppercase with underscores. E.g., `TOTAL_COST_IN_DOLLARS`.
  - **Preferred By**:
    - **C#**: Constants.
    - **JavaScript/TypeScript**: Constants.
    - **Python**: Constants (PEP 8).
    - **Data Engineering**: Constants in Databricks/Snowflake scripts.
  - **Benefits**: Signals immutability, highly visible.
- **Before (Bad Naming)**: Ambiguous, no convention.
  ```python
  // Python: Bad
  maxusers = 100 # Unclear if constant, no separator
  ```
- **After (Good Naming)**: Clear constant, screaming snake case.
  ```python
  // Python: Good
  MAX_USERS = 100 # Screaming snake, clear constant
  ```
- **Visual**: Red/green highlight for constant clarity.

## Slide 7: Summary & Best Practices
- **Table: Conventions by Language/Tool**

  | Language/Tool       | Primary Conventions                  | Example |
  |---------------------|--------------------------------------|---------|
  | C#                 | Pascal (classes/methods), Camel (vars) | `ClassName`, `varName` |
  | JavaScript/TypeScript | Camel (vars/functions), Pascal (classes) | `funcName()`, `ClassName` |
  | Python             | Snake (vars/functions), Pascal (classes) | `func_name()`, `ClassName` |
  | Databricks         | Snake (Python), Pascal (Scala) | `data_frame_column` |
  | Snowflake          | Snake or Uppercase (SQL) | `table_name`, `TABLE_NAME` |

- **Benefits (Chapter 2 Alignment)**:
  - **Readability**: Clear word boundaries (e.g., snake case in Python).
  - **Maintainability**: Matches IDE/framework norms (e.g., C# Pascal).
  - **Error Reduction**: Signals intent (e.g., screaming snake for constants).
- **Best Practices**:
  - Use linters (ESLint, Pylint) to enforce conventions.
  - Align with team/language standards (e.g., PEP 8 for Python).
  - Discuss preferences in book club to unify codebase.
- **Visual**: Include a meme (e.g., “Bad names are like a bad joke: if you have to explain it, it’s not good”).