type InputProps = {
    type: string;
    label: string;
    placeholder: string;
    name: string;
    value?: string;
  };

  type FormProps = {
    inputs: InputProps[];
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    showCancelButton?: boolean;
    onCancel?: () => void;
  };

  function Form({ inputs, onSubmit, onChange, showCancelButton, onCancel }: FormProps) {
    return (
        <div className="flex justify-center rounded-md items-center bg-white border">
          <form onSubmit={onSubmit} className="w-full p-8 rounded-lg shadow-lg">
            {inputs.map((input, index) => (
              <div key={index} className="mb-6">
                <label htmlFor={input.name} className="block text-gray-700 font-bold mb-2 sm: text-sm xl: text-xl">
                  {input.label}
                </label>
                {input.type === 'select' ?
                <select name={input.name} onChange={onChange} id={input.name} className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="daily">Diária</option>
                  <option value="weekly">Semanal</option>
                  <option value="monthly">Mensal</option>
                </select> :
                input.type === 'checkbox' ?
                <input type={input.type} placeholder={input.placeholder} name={input.name} onChange={onChange} id={input.name} className="text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/> :
                <input type={input.type} placeholder={input.placeholder} name={input.name} onChange={onChange} id={input.name} className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                }
              </div>
            ))}
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
              Enviar
            </button>
            {showCancelButton && (
            <button type="button" onClick={onCancel} className="w-full bg-gray-300 hover:bg-gray-400 text-black font-bold py-3 px-4 rounded-lg mt-4 transition duration-300">
              Cancel
            </button>
          )}
          </form>
        </div>
      );
  }
  
  export default Form;