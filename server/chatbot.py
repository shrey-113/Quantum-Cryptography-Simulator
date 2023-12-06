from openai import OpenAI
client = OpenAI(
    api_key=""
)

def getresponsefromchatbot(prompt):
    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a Quantum Expert. Only answer the questions specific to Quantum Mechanics and QKD Cryptographyy. Do not answer any other question, just say 'I am sorry, but this does not realte to Quantum Computing or QKD in any way'."},
        {"role": "user", "content": prompt}
    ]
    )
    return (completion.choices[0].message)