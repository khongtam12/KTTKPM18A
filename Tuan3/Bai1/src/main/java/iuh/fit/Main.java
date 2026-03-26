package iuh.fit;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {

        Folder root = new Folder("Root");

        File file1 = new File("file1.txt", "Hello");
        File file2 = new File("file2.txt", "World");

        Folder subFolder = new Folder("SubFolder");
        subFolder.add(file2);

        root.add(file1);
        root.add(subFolder);

        root.display("");
    }
}