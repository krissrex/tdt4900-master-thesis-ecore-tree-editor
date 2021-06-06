import { mount, shallowMount } from "@vue/test-utils";
import Icon from "@/components/tree/Icon.vue";
import { NodeIcon } from "treedocumentmodel";

describe("Icon.vue", () => {
  it("shows multiple icons with the first below", () => {
    // When
    const wrapper = shallowMount(Icon, {
      propsData: {
        iconData: { icons: ["uri1", "uri2", "uri3"] } as NodeIcon,
      },
    });

    // Then
    const imgs = wrapper.findAll("img");
    expect(imgs).toHaveLength(3);

    expect(imgs.at(0).attributes().src).toBe("uri1");
    expect(imgs.at(1).attributes().src).toBe("uri2");
    expect(imgs.at(2).attributes().src).toBe("uri3");
  });
});
