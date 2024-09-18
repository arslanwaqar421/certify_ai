from openai import OpenAI
from .config import OPEN_AI_API_KEY
import json

def get_openai_client():
 return OpenAI(api_key=OPEN_AI_API_KEY)

def generate_quizes_json(client, topic, difficulty):
  completion = client.chat.completions.create(
    model="gpt-4o-mini",
    response_format={ "type": "json_object" },
    messages=[
      {"role": "system", "content": """
      You are an expert quiz creator, proficient in generating quizzes on specified topics and difficulty levels. 

Please create a JSON array containing exactly 4 distinct quizzes. Each quiz should include the following:

1. **`quiz_name`**: The name of the quiz.
2. **`details`**: A brief two-line description of what the quiz covers.

Each quiz must contain 10 well-structured questions. Each question should follow this format:

- **`question`**: The question text.
- **`options`**: An object where the keys are `option1`, `option2`, `option3`, `option4`, and the values are the respective options.
- **`correct_option`**: The exact text of the correct option.

Ensure that the JSON output strictly adheres to this format and is properly structured. The output must be valid JSON.

Here is an example format for a single question:
```json
{
  "question": "What is the capital of France?",
  "options": {
    "option1": "Berlin",
    "option2": "Madrid",
    "option3": "Paris",
    "option4": "Rome"
  },
  "correct_option": "Paris"
}
  """},
      {"role": "user", "content": f"Topic : {topic} \n Diffculty: {difficulty} "}
    ]
  )
  return json.loads(completion.choices[0].message.content)


if __name__ == "__main__":
  client = get_openai_client()
  quizes_json = generate_quizes_json(client, 'Python Programming', 'Intermediate')
  print(quizes_json)
