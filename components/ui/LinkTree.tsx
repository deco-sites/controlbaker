import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import type { ComponentChildren } from "preact";

export interface Props {
  header: Header;
  links: Links;
  background: Background;
}

export interface Header {
  /** @description 150px x 150px image recommended */
  logo?: Logo;
  /** @format textarea */
  title?: string;
  /** @format textarea */
  description?: string;
  /**
   * @format color
   * @description color to be used in title and description
   */
  textColor: string;
}

export interface Logo {
  img?: ImageWidget;
  /** @description alternative text */
  alt?: string;
  width?: number;
  height?: number;
  /** @description external link on logo */
  link?: string;
}

export interface Links {
  items?: Link[];
  style: Style;
}

export interface Link {
  /** @description 20px transparent png recommended */
  icon?: AvailableIcons;
  label: string;
  /** @format textarea */
  href: string;
}

export interface Style {
  /**
   * @format color
   * @description color to be used in link's text
   */
  textColor: string;
  gradientColors: Gradient;
}

export interface Gradient {
  /** @description multiple colors will create a gradient effect */
  neutral: Neutral[];
}

export interface Neutral {
  /**  @format color */
  color: string;
}

export interface Background {
  /** @description an image will override any background color */
  image?: ImageWidget;
  /** @format color */
  backgroundColor?: string;
}


function Links(props: Props) {
  const { header, background, links } = props;
  const logo = (
    <Image
      decoding="async"
      src={header.logo?.img || ""}
      alt={header.logo?.alt}
      width={header.logo?.width || 171}
      height={header.logo?.height || 60}
    />
  );
  const linkStyle = {
    padding: "28px 20px"
  }
  const maybeLink = header?.logo?.link
    ? <a href={header?.logo?.link!} target="_blank">{logo}</a>
    : logo;

  const ColorsNeutralAndHover = {
    color: links.style?.textColor,
    backgroundImage: `linear-gradient(to right, ${
      links.style?.gradientColors.neutral.map((color) => color.color).join(
        ", ",
      )
    })`,
  };

  return (
    <BaseContainer background={background}>
      <header class="flex flex-col justify-center items-center gap-4">
        {header?.logo?.img && (
          <div class="rounded-full p-4">
            {maybeLink}
          </div>
        )}

        {header?.title && (
          <h1
            class="text-4xl font-bold text-center"
            style={{ color: header.textColor }}
          >
            {header?.title}
          </h1>
        )}

        {header?.description && (
          <p
            class="text-2xl text-center"
            style={{ color: header.textColor}}
          >
            {header?.description}
          </p>
        )}
      </header>

      <main class="w-full">
        <ul class="flex flex-col justify-center items-center gap-4">
          {links?.items?.map((link) => (
            <li class="w-full">
              <a
                target="_blank"
                href={link.href}
                class="group h-[52px] px-6 rounded-full flex justify-start items-center font-bold gap-4"
                style={{ ...linkStyle, ...ColorsNeutralAndHover }}
              >
                {Boolean(link.icon) && (
                  <Icon
                    size={20}
                    id={link.icon!}
                    strokeWidth={2.5}
                  />
                )}

                <span class="w-full text-center text-base">
                  {link.label}
                </span>

              </a>
            </li>
          ))}
        </ul>
      </main>

    </BaseContainer>
  );
}

function BaseContainer(props: {
  children?: ComponentChildren;
  background?: Props["background"];
}) {
  const { image } = props?.background ?? {};
  const baseClasses = "flex justify-center w-full min-h-screen";
  const inlineStyle = image ? { background: `url(${image})` } : undefined;
  const backgroundColors = props?.background?.backgroundColor;
  const containerClasses = `${baseClasses}`;

  return (
    <div
      class={containerClasses}
      style={{
        ...inlineStyle,
        backgroundColor: backgroundColors ? backgroundColors : undefined,
      }}
    >
      <div class="flex flex-col items-center gap-12 p-10 max-w-[640px] w-full">
        {props.children}
      </div>
    </div>
  );
}

export default Links;
