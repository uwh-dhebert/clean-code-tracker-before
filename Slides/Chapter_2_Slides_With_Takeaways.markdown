# Clean Code Book Club: Chapter 2 - Meaningful Names (Detailed Slides with Takeaways)

These slides cover Chapter 2 of *Clean Code* by Robert C. Martin, with one slide per major talking point from the chapter, plus a new slide for takeaways and next steps. Each slide includes quotes/excerpts, explanations, benefits, and before/after code examples tailored to C#, JavaScript/TypeScript, Python, and Data Engineering (Databricks, Snowflake). Naming conventions (Camel Case, Pascal Case, Snake Case, Kebab Case, etc.) are integrated where relevant. The final slide summarizes key takeaways and actionable next steps for your book club.

Visual suggestions: Use italicized book quotes, syntax-highlighted code, red/green for bad/good examples, and icons (e.g., warning for disinformation, checklist for takeaways).

## Slide 1: Introduction to Chapter 2
- **Key Quote**: "Names are everywhere in software. We name our variables, our functions, our classes, and so forth." – Robert C. Martin
- **Overview**: Chapter 2 stresses that good names enhance readability and maintainability, while bad names cause confusion and bugs.
- **Major Talking Points**: One slide per principle, plus takeaways/next steps.
- **Benefits**: Reduces cognitive load, makes code self-documenting.
- **Visual**: Book cover and mind map of principles.

## Slide 2: Use Intention-Revealing Names
- **Key Quote**: "The name of a variable, function, or class, should answer all the big questions."
- **Explanation**: Names should reveal purpose (why, what, how) without comments.
- **Benefits**: Improves understanding; reduces need for documentation.
- **Before (Bad)**: Vague name.
  ```csharp
  // C#: Bad
  int d; // elapsed time?
  ```
- **After (Good)**: Clear intent, camel case.
  ```csharp
  // C#: Good
  int elapsedTimeInDays;
  ```
- **Data Engineering Example**:
  ```python
  # Bad (Databricks)
  df = pd.read_csv('file.csv')  # What is df?
  # Good
  customerDataFrame = pd.read_csv('customers.csv')
  ```
- **Visual**: Arrow from name to "what/why/how" questions.

## Slide 3: Avoid Disinformation
- **Key Quote**: "We should avoid words whose entrenched meanings vary from our intended meaning."
- **Explanation**: Avoid misleading names (e.g., 'list' for a map).
- **Benefits**: Prevents bugs from wrong assumptions.
- **Before (Bad)**: Misleading.
  ```javascript
  // JS: Bad
  let accountList = {}; // Not a list
  ```
- **After (Good)**: Accurate, camel case.
  ```javascript
  // JS: Good
  let accountMap = {};
  ```
- **Snowflake Example**:
  ```sql
  -- Bad
  SELECT * FROM user_list; -- If it's a view
  -- Good
  SELECT * FROM user_accounts_view;
  ```
- **Visual**: Warning icon for bad names.

## Slide 4: Make Meaningful Distinctions
- **Key Quote**: "If names must be different, then they should also mean something different."
- **Explanation**: Avoid noise like 'a1', 'a2'; differentiate purpose.
- **Benefits**: Reduces confusion; improves searchability.
- **Before (Bad)**: Noise words.
  ```python
  # Python: Bad
  def copyChars(a1, a2):
      for i in range(len(a1)):
          a2[i] = a1[i]
  ```
- **After (Good)**: Distinct, snake case.
  ```python
  # Python: Good
  def copy_chars(source, destination):
      for i in range(len(source)):
          destination[i] = source[i]
  ```
- **C# Example**:
  ```csharp
  // Bad
  public void GetData1() { }
  // Good
  public void GetActiveCustomers() { }
  ```
- **Visual**: Diff highlight for clarity.

## Slide 5: Use Pronounceable Names
- **Key Quote**: "Humans are good at words. A significant part of our brains is dedicated to the concept of words."
- **Explanation**: Names should be sayable in team discussions.
- **Benefits**: Easier communication and recall.
- **Before (Bad)**: Unpronounceable.
  ```typescript
  // TS: Bad
  class DtaRcrd102 {
      private genymdhms: Date;
  }
  ```
- **After (Good)**: Pronounceable, Pascal case.
  ```typescript
  // TS: Good
  class CustomerRecord {
      private generationTimestamp: Date;
  }
  ```
- **Databricks Example**:
  ```python
  # Bad
  df_jnd = df1.join(df2)
  # Good
  joined_customer_orders = customers_df.join(orders_df)
  ```
- **Visual**: Speech bubble with "How do you say this?".

## Slide 6: Use Searchable Names
- **Key Quote**: "Single-letter names can ONLY be used as local variables inside short methods."
- **Explanation**: Use longer, searchable names for constants/variables.
- **Benefits**: Easy to find with search tools.
- **Before (Bad)**: Magic numbers.
  ```javascript
  // JS: Bad
  for (let j = 0; j < 34; j++) {
      s += (t[j] * 4) / 5;
  }
  ```
- **After (Good)**: Searchable, screaming snake case.
  ```javascript
  // JS: Good
  const MAX_CLASSES_PER_STUDENT = 34;
  let realDaysPerIdealDay = 4;
  for (let j = 0; j < MAX_CLASSES_PER_STUDENT; j++) {
      sum += (t[j] * realDaysPerIdealDay) / 5;
  }
  ```
- **Python Example**:
  ```python
  # Bad
  total = sum(prices) * 0.05
  # Good
  TAX_RATE = 0.05
  total_with_tax = sum(prices) * TAX_RATE
  ```
- **Visual**: Magnifying glass over good names.

## Slide 7: Avoid Encodings
- **Key Quote**: "Encoded names are seldom pronounceable and are easy to mis-type."
- **Explanation**: Avoid Hungarian notation (e.g., 'szName') or 'm_' prefixes.
- **Benefits**: Modern IDEs make types clear; focuses on meaning.
- **Before (Bad)**: Encoded.
  ```csharp
  // C#: Bad
  private string szName;
  ```
- **After (Good)**: Clean, camel case.
  ```csharp
  // C#: Good
  private string customerName;
  ```
- **JS Example**:
  ```javascript
  // Bad
  let a_phones = [];
  // Good
  let phoneNumberList = [];
  ```
- **Visual**: Cross-out on encoded names.

## Slide 8: Avoid Mental Mapping
- **Key Quote**: "Readers shouldn't have to mentally translate your names into other names they already know."
- **Explanation**: Use clear names; avoid 'r' for URL.
- **Benefits**: Reduces cognitive load.
- **Before (Bad)**: Requires mapping.
  ```python
  # Python: Bad
  r = 'https://example.com'
  ```
- **After (Good)**: Direct, snake case.
  ```python
  # Python: Good
  url = 'https://example.com'
  ```
- **C# Example**:
  ```csharp
  // Bad
  var theList;
  // Good
  var gameBoard;
  ```
- **Visual**: Brain icon with question marks.

## Slide 9: Class Names
- **Key Quote**: "Classes and objects should have noun or noun phrase names like Customer, WikiPage, Account, and AddressParser."
- **Explanation**: Classes represent things, not actions.
- **Benefits**: Clear object-oriented design.
- **Before (Bad)**: Verb-based.
  ```typescript
  // TS: Bad
  class Manager { }
  ```
- **After (Good)**: Noun, Pascal case.
  ```typescript
  // TS: Good
  class PayrollCalculator { }
  ```
- **Python Example**:
  ```python
  # Bad
  class Run { }
  # Good
  class Runner { }
  ```
- **Visual**: Noun icons (e.g., person).

## Slide 10: Method Names
- **Key Quote**: "Methods should have verb or verb phrase names like postPayment, deletePage, or save."
- **Explanation**: Methods denote actions; use get/set/is for accessors.
- **Benefits**: Clear behavior; command-query separation.
- **Before (Bad)**: Noun-based.
  ```csharp
  // C#: Bad
  public string Name() { }
  ```
- **After (Good)**: Verb, Pascal case.
  ```csharp
  // C#: Good
  public string GetName() { }
  ```
- **JS Example**:
  ```javascript
  // Bad
  function user() { }
  // Good
  function saveUser() { }
  ```
- **Visual**: Action icons (e.g., arrow).

## Slide 11: Don't Be Cute
- **Key Quote**: "Don't be cute. If you're referring to deleting an object, call it delete or remove, not whack or holyHandGrenade."
- **Explanation**: Avoid humorous/cultural references.
- **Benefits**: Professional; accessible to all.
- **Before (Bad)**: Cute.
  ```python
  # Python: Bad
  def holyHandGrenade(items):
      del items[:]
  ```
- **After (Good)**: Direct, snake case.
  ```python
  # Python: Good
  def deleteItems(items):
      del items[:]
  ```
- **Databricks Example**:
  ```python
  # Bad
  def eatMyShorts(df):
  # Good
  def filterInvalidRows(dataframe):
  ```
- **Visual**: No-joke sign.

## Slide 12: Pick One Word per Concept
- **Key Quote**: "Pick one word per abstract concept and stick with it."
- **Explanation**: Avoid mixing 'fetch', 'retrieve', 'get'.
- **Benefits**: Consistency in large codebases.
- **Before (Bad)**: Inconsistent.
  ```javascript
  // JS: Bad
  getUser();
  fetchAccount();
  retrieveOrder();
  ```
- **After (Good)**: Unified, camel case.
  ```javascript
  // JS: Good
  getUser();
  getAccount();
  getOrder();
  ```
- **Snowflake Example**:
  ```sql
  -- Bad
  SELECT * FROM users; FETCH FROM accounts;
  -- Good
  SELECT * FROM users; SELECT FROM accounts;
  ```
- **Visual**: Thesaurus with crossed-out synonyms.

## Slide 13: Don't Pun
- **Key Quote**: "Avoid using the same word for two purposes."
- **Explanation**: Don't reuse 'add' for math and appending.
- **Benefits**: Clear intent.
- **Before (Bad)**: Ambiguous.
  ```csharp
  // C#: Bad
  void add(int x, int y) { }
  void add(Item item) { }
  ```
- **After (Good)**: Distinct, Pascal case.
  ```csharp
  // C#: Good
  int sum(int x, int y) { }
  void append(Item item) { }
  ```
- **Python Example**:
  ```python
  # Bad
  def insert(value):
  # Good
  def add_to_total(value):
  def append_to_list(value):
  ```
- **Visual**: Pun warning label.

## Slide 14: Use Solution Domain Names
- **Key Quote**: "You can use computer science (CS) terms, algorithm names, pattern names, math terms, and so forth."
- **Explanation**: Use 'Visitor', 'JobQueue' for technical accuracy.
- **Benefits**: Leverages developer knowledge.
- **Before (Bad)**: Vague.
  ```typescript
  // TS: Bad
  class ThingProcessor { }
  ```
- **After (Good)**: CS term, Pascal case.
  ```typescript
  // TS: Good
  class AccountVisitor { }
  ```
- **C# Example**:
  ```csharp
  // Bad
  public void Process() { }
  // Good
  public void TraverseTree() { }
  ```
- **Visual**: CS glossary icons.

## Slide 15: Use Problem Domain Names
- **Key Quote**: "When there is no 'programmer-eese' for what you're doing, use the name from the problem domain."
- **Explanation**: Use business terms like 'Policy', 'Accountant'.
- **Benefits**: Bridges tech and business.
- **Before (Bad)**: Generic.
  ```python
  # Python: Bad
  class Record { }
  ```
- **After (Good)**: Domain-specific, Pascal case.
  ```python
  # Python: Good
  class PatientMedicalHistory { }
  ```
- **Snowflake Example**:
  ```sql
  -- Bad
  CREATE TABLE data;
  -- Good
  CREATE TABLE inventory_stock_levels;
  ```
- **Visual**: Business icons (e.g., briefcase).

## Slide 16: Add Meaningful Context
- **Key Quote**: "Most names don't have enough context by themselves."
- **Explanation**: Use classes or prefixes to provide context.
- **Benefits**: Groups related concepts.
- **Before (Bad)**: No context.
  ```javascript
  // JS: Bad
  let firstName, lastName, street, city;
  ```
- **After (Good)**: Contextual class, camel case.
  ```javascript
  // JS: Good
  class Address {
    firstName;
    lastName;
    street;
    city;
  }
  ```
- **Python Example**:
  ```python
  # Bad
  state = 'TX'
  # Good
  addr_state = 'TX'
  ```
- **Visual**: Grouping brackets.

## Slide 17: Don't Add Gratuitous Context
- **Key Quote**: "In general, you want to add no more context to a name than is necessary."
- **Explanation**: Avoid redundant prefixes like 'GSDAccount'.
- **Benefits**: Concise names.
- **Before (Bad)**: Over-prefixed.
  ```csharp
  // C#: Bad
  private string GSDAddress; // Gas Station Deluxe app
  ```
- **After (Good)**: Minimal, camel case.
  ```csharp
  // C#: Good
  private string address;
  ```
- **JS Example**:
  ```javascript
  // Bad
  const theCarBrandName = 'Toyota';
  // Good
  const carBrand = 'Toyota';
  ```
- **Visual**: Scissors cutting prefixes.

## Slide 18: Takeaways & Next Steps
- **Key Quote**: "The hardest thing about choosing good names is that it requires good descriptive skills and a shared cultural background."
- **Key Takeaways**:
  - **Intention Matters**: Names should answer why/what/how (e.g., `elapsedTimeInDays` vs. `d`).
  - **Avoid Confusion**: Steer clear of disinformation, puns, or vague terms (e.g., `accountMap` vs. `accountList`).
  - **Consistency is Key**: Use one word per concept; follow language conventions (e.g., snake case in Python, Pascal in C#).
  - **Readability & Communication**: Pronounceable, searchable names improve team collaboration.
  - **Context Balance**: Add necessary context via classes/prefixes, but avoid redundancy.
  - **Conventions by Language**:
    - **C#**: Pascal for classes/methods (`ClassName`), camel for variables (`varName`).
    - **JS/TS**: Camel for vars/functions (`funcName`), Pascal for classes (`ClassName`), kebab for CSS (`user-profile`).
    - **Python**: Snake for vars/functions (`func_name`), Pascal for classes (`ClassName`), screaming snake for constants (`MAX_USERS`).
    - **Databricks/Snowflake**: Snake for columns (`table_name`), uppercase/snake for SQL (`TABLE_NAME`).
- **Next Steps for Book Club**:
  - **Review Codebase**: Audit your projects for bad names (e.g., vague, encoded, or cute names).
  - **Adopt Linters**: Use ESLint (JS/TS), Pylint (Python), or StyleCop (C#) to enforce naming conventions.
  - **Team Agreement**: Discuss and standardize naming conventions for your team (e.g., camel vs. snake for shared Python/JS projects).
  - **Practice**: Refactor a small module in your codebase, applying Chapter 2 principles, and share results next meeting.
  - **Next Chapter Prep**: Read Chapter 3 (Functions) and identify naming impacts on function design.
- **Visual**: Checklist of takeaways, roadmap graphic for next steps, and a meme: “Good names tell a story; bad names start a mystery.”