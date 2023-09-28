function perform_unit_test(function_to_test, container_id, unit_test_info)
/* 
Takes the following arguments:
function_to_test -> function: A function to perform unit tests on
container_id -> String, element ID of a container HTML element to generate testing elements (probably body)
identifier -> Number or string, something to uniquely ID the generated elements.
unit_test_info -> json object: Defines the unit test on the function as follows.
{
    "function_parameters": [
        {
            parameter_type: 「Integer, 
                                0 if this is the ID of an input element that the function draws input from (extracts value attribute)
                                1 if this is the ID an html element that the function puts output to (sets innerHTML)
                                Any other number if this is passed directly into the function itself
                            」
            tag_name: 「String, the tagname of the html element. Is ignored if interaction_type = 2」
        },       
         。。。
        「There should be n repetitions of the previous object for n function parameters
            And they should be in the order of the function's parameters.」
    ]
        test_cases: [
            [
            「This should be an array of arguments for a test case.
              In the case of parameter_type 0, it should be the element id of the element to get the data from.
              In the case of parameter_type 1, it should be skipped and not included in the array.
              In all other cases, it should be raw data to pass into the function」
            ]
        ]
}

*/
{
    let container_element = document.getElementById(container_id);
    let number_of_parameters = unit_test_info.function_parameters.length;
    let test_cases = unit_test_info.test_cases;
    let number_of_test_cases = unit_test_info.test_cases.length;

    for(let i = 0; i < number_of_test_cases; i++)
    {
        let function_parameters = unit_test_info.function_parameters;
        let actual_arguments_to_pass = [];
        let argument_index = 0;
        let output_elements = [];


        /*Create a labels for the test case*/
        let testcase_title = document.createElement("h2");
        let testcase_title_text_node = document.createTextNode("======Test case " + (i + 1) + "========");
        testcase_title.appendChild(testcase_title_text_node);  
        container_element.appendChild(testcase_title);

        /*Create a label for the simulated inputs*/
        let input_title = document.createElement("h2");
        let input_title_text_node = document.createTextNode("Simulated user input:");
        input_title.appendChild(input_title_text_node);
        container_element.appendChild(input_title);

        for(let j = 0; j < number_of_parameters; j++)
        {
            if(function_parameters[j].parameter_type == 0) /* Input html element */
            {
                var input_element_id = container_id + "input_element" + j + "_" + i;
                var input_element = document.createElement(function_parameters[j].tag_name);
                input_element.setAttribute("id", input_element_id);
                input_element.setAttribute("value", test_cases[i][argument_index])

                container_element.appendChild(input_element);

                actual_arguments_to_pass.push(input_element_id)
                argument_index++;
            }
            else if(function_parameters[j].parameter_type == 1) /* Output html element */
            {
                var output_element_id = container_id + "output_element" + j + "_" + i;
                var output_element = document.createElement(function_parameters[j].tag_name);
                output_element.setAttribute("id", output_element_id);

                output_elements.push(output_element) /*Store to be added later, so we can have output elements separate from input elements in displaying test results*/
                actual_arguments_to_pass.push(output_element_id);
            }
            else /* Raw pass */
            {
                actual_arguments_to_pass.push(test_cases[i][argument_index]);
                argument_index++;
            }
        }

        /*Create a label for output*/
        let output_title = document.createElement("h2");
        let output_title_text_node = document.createTextNode("Output:");
        output_title.appendChild(output_title_text_node);
        container_element.appendChild(output_title);
        
        /*Add the output elements*/
        for(let k = 0; k < output_elements.length; k++)
        {
            container_element.appendChild(output_elements[k]);
        }
        /* SHABANG!! */
        function_to_test.apply(null, actual_arguments_to_pass);


        /*Gather the results*/
    }
}