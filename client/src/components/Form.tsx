type InputProps = {
    type: string;
    label: string;
    placeholder: string;
    name: string;
  };

  type FormProps = {
    inputs: InputProps[];
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };

  function Form({ inputs, onSubmit, onChange }: FormProps) {
    return (
        <div className="min-w-screen min-h-screen flex justify-center items-center bg-gray-100">
          <form onSubmit={onSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
            {inputs.map((input, index) => (
              <div key={index} className="mb-6">
                <label
                  htmlFor={input.name}
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  {input.label}
                </label>
                <input
                  type={input.type}
                  placeholder={input.placeholder}
                  name={input.name}
                  onChange={onChange}
                  id={input.name}
                  className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
            >
              Enviar
            </button>
          </form>
        </div>
      );
  }
  
  export default Form;