package iuh.fit;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {
        XMLService xmlService = new XMLService();

        JSONService adapter = new XMLtoJSONAdapter(xmlService);

        String json = "{name: 'Tam', age: 20}";
        adapter.sendJSON(json);
    }
}