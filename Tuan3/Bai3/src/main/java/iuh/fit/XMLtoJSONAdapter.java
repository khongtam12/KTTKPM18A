package iuh.fit;

public class XMLtoJSONAdapter implements JSONService {
    private XMLService xmlService;

    public XMLtoJSONAdapter(XMLService xmlService) {
        this.xmlService = xmlService;
    }

    @Override
    public void sendJSON(String json) {
        // convert JSON -> XML
        String xml = convertJSONtoXML(json);
        xmlService.sendXML(xml);
    }

    private String convertJSONtoXML(String json) {
        // demo đơn giản (thực tế dùng thư viện)
        return "<data>" + json + "</data>";
    }
}