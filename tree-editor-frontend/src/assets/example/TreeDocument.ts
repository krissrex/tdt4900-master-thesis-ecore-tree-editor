export default `<?xml version="1.0" encoding="UTF-8"?>
<TreeDocumentModel:TreeDocument
    xmi:version="2.0"
    xmlns:xmi="http://www.omg.org/XMI"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:TreeDocumentModel="http://stud.ntnu.no/krirek/2021/treedocumentmodel"
    xsi:schemaLocation="http://stud.ntnu.no/krirek/2021/treedocumentmodel ../model/TreeDocumentModel.ecore">
  <roots id="MyEcore.ecore">
    <rootNode
        id="0"
        type="EPackage"
        name="MyEcore">
      <children
          id="1"
          type="EClass"
          name="TestClass">
        <children
            id="5"
            type="EAnnotation"
            name="Ecore"/>
        <children
            id="6"
            type="EAnnotation"
            name="Genmodel">
          <children
              id="11"
              type="EStringToStringMapEntry"
              name="documentation"/>
        </children>
        <children
            id="7"
            type="EOperation"
            name="myOperation()"/>
        <children
            id="8"
            type="EAttribute"
            name="MyAttribute"/>
        <children
            id="9"
            type="EReference"
            name="MyReference"/>
        <children
            id="10"
            type="EReference"
            name="me"/>
      </children>
      <children
          id="2"
          type="EEnum"
          name="MyEnum"/>
      <children
          id="3"
          type="EDataType"
          name="MyData"/>
      <children
          id="4"
          type="EClass"
          name="Circular"/>
    </rootNode>
    <actions>
      <availableActions
          id="ecore:new_child"
          name="New child"/>
      <availableActions
          id="ecore:new_sibling"
          name="New sibling"/>
    </actions>
    <hierarchy>
      <allowedChildren key="EPackage">
      <value>EAnnotation</value>
      <value>EPackage</value>
      <value>EDataType</value>
      <value>EEnum</value>
      <value>EClass</value>
      </allowedChildren>
      <allowedChildren key="EClass">
        <value>EAnnotation</value>
        <value>EAttribute</value>
        <value>EReference</value>
      </allowedChildren>
      <allowedChildren key="EAnnotation"/>
      <roots>EPackage</roots>
    </hierarchy>
    <icons>
      <icons key="EAnnotation" value="data:image/gif;base64,R0lGODlhEAAQAOYAAD0xNlBBR8/KzFhJUE08RFlIUFRETEA0OkM3PXdnb3tvdcS8wFNETF1OVnRjbGVYX5mMk0o/RU1CSHZrcV1NVmFTW3xudpqOlX1zeYR6gIB2fNHMz9rV2GBTW2RXX2lcZGxfZ4J1fUY7Qoh9hI+Ei2hcZGtfZ25iapiPldnW2JSKkdPP0q6prbSus/+M/+zd8IpFoKdourJ6w7R9xbyIzMSV0tKv3d/H5uLM6ePO6ebS7KhsvNm+4vf28/b18tvXze3r5uPf1/Hv6/j39ff29N/a0efj3O3p4+rm4HRlWf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEoALAAAAAAQABAAAAeHgEqCg4SFhoeIiYUsJycsioIggiaQSiUuGR+QEg8pGh4rKKKjoi1KERVDGB09R66vripKIhRECg04NEhINL26JEoIBT4TAy8zRkYzNjbII0oHGwY5DDoyMDAyNTUyQSFKAAJCNwE8O0VFMeoxRRaCSQRJQD/09fUJghwLCxAO/v//LlQaeCgQADs="/>
      <icons key="EAttribute" value="data:image/gif;base64,R0lGODlhEAAQALMAAPj50fj51vf41vj41mpiP3JmPX1sOZV4MYpyNZ18L////wAAAAAAAAAAAAAAAAAAACH5BAEAAAoALAAAAAAQABAAAAQoUMlJq7046817TmAYXgdgnsBxIeiJXIYgBMFQG1dB7DxReMCgcDiJAAA7"/>
      <icons key="EClass" value="data:image/gif;base64,R0lGODlhEAAQAMQAAIKGgYKFgfj50fj51vf41vj41qCYbKGYbG1kP2piP3RoPHBlPXlqOoNvN35sOJN3Mo51NIlyNp18L5t7MJd4MP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABUALAAAAAAQABAAAAVLYCWOZGmeqKSu6ykJcCxI5yTH00kRxDAUP8rpcTAYj48T5AaDnCJMQeTU4PmAhcbJAQh4v44TI8o4KaKK08L6+y1OiIR8nkCg7qIQADs="/>
      <icons key="EDataType" value="data:image/gif;base64,R0lGODlhEAAQAMQAACo3Z3WGyLK84IKGgYKFgfj50fj51vf41vj41m1kP2piP3RoPHBlPXlqOoNvN35sOP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABAALAAAAAAQABAAAAVEICSOZGmeaIoGwAgEa8vCr8mKQI7D5T1DtZOghROgHCek6TEgOJ+PU6NArRYap4W1ujgxDgeDATFmnBKKtFqRULnfohAAOw=="/>
      <icons key="EEnum" value="data:image/gif;base64,R0lGODlhEAAQALMAACo3Z3WGyLK84GpiP3FmPX1sOZV4MYpyNZ18L////wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAAAQwMMlJq7044wAmCFvHgZ/FSUCKgtU5JuUldKig3dQwEMVhILigjucDBm/D3u/IvEQAADs="/>
      <icons key="EEnumLiteral" value="data:image/gif;base64,R0lGODlhEAAQALMAAGpiP3FmPHFmPX1rOX1sOZV4MYpyNZ18L////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAgALAAAAAAQABAAAAQaEMlJq70468275wAQDEZxZKFAlOfnvnAsaxEAOw=="/>
      <icons key="EFactory" value="data:image/gif;base64,R0lGODlhEAAQAMQAAKeto3N3cGNmYHt8cpOSgouCV5KJXKGXZ6edbIeEdZqPYZKIXKyhb5WMeKGUe6mZfcK3o9Swe8umdcundcqmdb6Zbb6abaBQQP///8DAwP///wAAAAAAAAAAAAAAAAAAACH5BAEAABoALAAAAAAQABAAAAVQoCaOZGmeaHoy15i9WmYibSy+cnm0rHsqvFrK0NqpIIXHY6FsQkoPAAEgjVgjj5IDIwBwrxFHqSEQEMoUiWTSKCUsFXh8nigF7vj8QMXva0IAOw=="/>
      <icons key="EGenericElementType" value="data:image/gif;base64,R0lGODlhEAAQAKIAALS70aOuyJGlx0dpjwFGegE/bf///wAAACH5BAEAAAYALAAAAAAQABAAAAMraLrc/jDKuUizD18nxirLIDRD8AQeQwAPoClr+xrlmS7dF46bM1c9ijCSAAA7"/>
      <icons key="EGenericException" value="data:image/gif;base64,R0lGODlhEAAQAKIAALS70aOuyJGlx0dpjwFGegE/bf///wAAACH5BAEAAAYALAAAAAAQABAAAAMxaLrc/jDKuUizD5tSnRgLpwxCMwThEoAMAaQKoCkubMgmqojG2nwPkkPDm7UulOQkAQA7"/>
      <icons key="EGenericSuperType" value="data:image/gif;base64,R0lGODlhEAAQALMAAN7h68PJ2qOuyLW+05Glx0dpjwFGegE/bf///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAgALAAAAAAQABAAAAQ4EMlJq7046z1N9ReIHJ1FFJJHIgVRFcM4kQNKGcCh7wcgpoHZJPBjCYQSgW1yQrJcH2exdONYNxEAOw=="/>
      <icons key="EGenericType" value="data:image/gif;base64,R0lGODlhEAAQAKIAALS70aOuyJGlx0dpjwFGev///wAAAAAAACH5BAEAAAUALAAAAAAQABAAAAMoWLrc/jDKuUizD18nxhtCMwRP4DEE8ACakq5tMZbn0n3h5sSVTv2RBAA7"/>
      <icons key="EGenericTypeArgument" value="data:image/gif;base64,R0lGODlhEAAQALMAAN7h68PJ2qOuyLW+05Glx0dpjwFGegE/bf///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAgALAAAAAAQABAAAAQ4EMlJq7046z1N9Rf4WURxFURVCNKBuIhgUkbwTm4gSgYA44AdojC4tRCD2aR0hKEsQh5GGOVYKxEAOw=="/>
      <icons key="EGenericWildcard" value="data:image/gif;base64,R0lGODlhEAAQAKIAALS70aOuyJGlx0dpjwFGegE/bf///wAAACH5BAEAAAYALAAAAAAQABAAAAM0aLrc/jDKuUizD5etMBODUSzjIDRD0IxByBAAMxqA18XKTNtGSi6tBuhhcnh0vMqFwpwkAAA7"/>
      <icons key="EObject" value="data:image/gif;base64,R0lGODlhEAAQANUAAN3i6Nni7NHY4NHY3d3k6ODk5eHk4dfa1+Lk4dja1djY19LQwuDczMbDt+jl2eHcy+nl2JiOcenl2d3a0ebk3vXoyNTPwunk2N3Rt+ndwendwuDazPXmyN3QtfXmyerdwuncwfDm0eTRruTRsPXmy/XmzPDl0a6PXquPYIp2VJuKcKmbh7Wrn////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAC0ALAAAAAAQABAAAAZgwJZwSCwaj8gkkqVKpVSs5CrSKBQakdWRFQl4v5FoUbUgCM4DgEVlTE0QisMhYaCk2hLIg/HYOC53Yx0hIBoZHyYYbEUsKBweFRySKGJFKyciJCUjJ1pLTU+VSqOkpURBADs="/>
      <icons key="EOperation" value="data:image/gif;base64,R0lGODlhEAAQAIMAAAAAgD8/Xz9ff19/n3+fv6bK8P/78AAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAAAgALAAAAAAQABAAAAQ6EMlJq704awGERkBwFEcAZAFRFGqACeNwDMThWcB6GAdBnBYYQUazYQIs38CFCfVKwAzn9qlar9hJBAA7"/>
      <icons key="EPackage" value="data:image/gif;base64,R0lGODlhEAAQAMQAAHM5hYpFoIRCmX4/klgsZqBXt6xswLV8x5JJqmw2fppNs5tPtJ1StZ1TtaNduqdkvbJ4xbqGy8ec1f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABMALAAAAAAQABAAAAVM4CSOZGmeaKpOxFowMAAzxbkckdHgxnIqEQkkEIQoTggD5JFQPhAmAiAQSFipgFYpwEvwAidBkSgUnAbOgHNwcgzegPfAsdKu7vhJCAA7"/>
      <icons key="EParameter" value="data:image/gif;base64,R0lGODlhEAAQAIcAAAAAgD8/X5mZzIODlz9ff19/n3+fv6bK8MXd9dvq+b/M2azB1czZ5f797/3yxv3xxv3xx/3yx/zmnr2EFv/9+bV6E651ErR7E7qAFbqBFbmAFalvEa91Eq50Eq90E691E6ZrEFpaWgAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJEJRZEJThInmAIAJBIlhAAAApFBkP2QAJAQBRIkLAAAABIk/JDuGJEJcJfkwJE+b5E+YgACCBIoPBIoFJEJRZEJThIn6AIAJBIl1AAAApFBkP2QAJAQBRIkfAAAABIlTJDuGJEJcJfkwJE+b5E+YgACCBIojBIoZBIk+DoAAJEHMgAAUToVuDoAAGGQCBIk0AAAAhInFJDuGJEHOP///5EHMpEGq5EG6xIn2AACfAAAAEqTIBInRJEicJEVlpEG6wAAAAAE/AAxeBIlZPAAAJEHMgAAN/AQ2PAAAPBFwBIlPJDuGBIngJDuGJEHOP///5EHMpEGq5EG6wABnAABrQAAAQAAAP38AACAAXC26AAAZxIlgHMAXAAAAAoACJE+iAACGgAAAJEGq+8AABIojAAAxgAAAGUAXGwAY8gAxv38ABIl4AAAArPfoAAAEEqTKHMAXG4AYWIAZHgAbzMAXDQALjUATUqYKGwAY3AAaWUAc2UAXBImSDoAAJEHMgAAAzoHGDoAAHJFcBImIEqYMBIoZJDuGJEHOP///5EHMpEGq5EG66GmIAAADAAAADoAADoAADoBeBInOJEOkToGCJEFbRsL/EqTKBsMAO8AAAAAAEqTIDoBeBInQEqTKAAAAIAYmAAAAHC26BIpHFcwSBIm7AAAEQABAIIJYBIpHAAACTScKcHEDDEMCKimjBxeiwAAEngAAAgAEgAMoQEAAAEAAAEAAEAAAEAAAAAAAAAAAAAAAAcAAHAQANQAACH5BAEAACMALAAAAAAQABAAAAhsAEcIHEiwoMGDCBMqFEgAAIGEEyYIGCDigIgAAA5OaDCBAYIDBg4EGIihZMkGDTAoCFHAgIiHIyo4mEnTQYURIgwYyDjCg0+fEiR4WNnypcENEjYkWKCzwEiDIEBMzHmRZ8KGMBdq3cq164iAADs="/>
      <icons key="EReference" value="data:image/gif;base64,R0lGODlhEAAQAMQAAE9UXkxgdEV/qEhzkjdAQvj50fj51vf41mpiP3JmPcC4n31sOZV4MYpyNcu9m518L////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABAALAAAAAAQABAAAAU0ICSOZGmeaKqubJs+cAxDgMkUeO7QRNnkBYFgEAAAeqPF4WBoGhS8UgJBrSZorqx2yxWFAAA7"/>
      <icons key="EStringToStringMapEntry" value="data:image/gif;base64,R0lGODlhEAAQAMQAAHdnb3RjbHxudpqOlYJ1fYh9hI+Ei5iPlZSKkbSus4pFoKdourJ6w7R9xbyIzMSV0tKv3ahsvNvXzePf19/a0efj3O3p4+rm4P///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABgALAAAAAAQABAAAAVSICaOZGmeaKqqyeG+8JtgiGXf+I1gxuX8josQGDRgCpUGBNKoOJXMSgFDmDAeD4Zie81OCBgBZUGOUM5kMkWAAUje8DgcgBkE7vg8frDq+/9/IQA7"/>
      <icons key="ETypeParameter" value="data:image/gif;base64,R0lGODlhEAAQAMQAANrd6LS70aOuyJGlx0dpj6O0x9La4wFGeuDp7/z62/797/vyufvusPvll72EFrZ8FLZ9Fa1yEq1zEqZrEP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABQALAAAAAAQABAAAAVQICWOZGmeaKquouOUBxWXjvKKs9y6tU0NhBFhQHEkjkiHQTASBB+LqJQBAYwCMUljy40gAtfYZDzZTigFpshJKp9/QdGw/caNcqkYnsUvhQAAOw=="/>
    </icons>
  </roots>
  <roots id="TestClass.genmodel">
    <actions>
      <availableActions
          id="generate:model"
          name="Generate Model"/>
      <nodeActions
          key="generate:model">
        <value>GenModel</value>
      </nodeActions>
    </actions>
    <hierarchy/>
  </roots>
</TreeDocumentModel:TreeDocument>

`;
