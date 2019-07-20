function solve(input) {
    let output = input.substring(input.lastIndexOf('\\') + 1)
    let fileName = output.substring(0, output.lastIndexOf('.'))
    let extension = output.substring(output.lastIndexOf('.') + 1)
    console.log(`File name: ${fileName}\nFile extension: ${extension}`);
}
solve('C:\\Projects\\Data-Structures\\LinkedList.cs');