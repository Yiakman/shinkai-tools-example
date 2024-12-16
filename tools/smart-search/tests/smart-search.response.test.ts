import assert from "node:assert";
import { shinkaiLlmPromptProcessor } from "../../../shinkai-local-tools.ts";
import { answerGenerator } from "../prompts/responsePrompt.ts";
import { SmartSearchStatement } from "../tool.ts";

// These environment variables are required, before any import.
// Do not remove them, as they set environment variables for the Shinkai Tools.
Deno.env.set('SHINKAI_NODE_LOCATION', "http://localhost:9950");
Deno.env.set('BEARER', "debug");
Deno.env.set('X_SHINKAI_TOOL_ID', "tool-id-debug");
Deno.env.set('X_SHINKAI_APP_ID', "tool-app-debug");
Deno.env.set('X_SHINKAI_LLM_PROVIDER', "gpt_4o_mini");
Deno.env.set('SHINKAI_HOME', "results/typescript/typescript-00001-benchmark-oauth-github/qwen2-5-coder-32b/editor/home");
Deno.env.set('SHINKAI_MOUNT', "results/typescript/typescript-00001-benchmark-oauth-github/qwen2-5-coder-32b/editor/mount");
Deno.env.set('SHINKAI_ASSETS', "results/typescript/typescript-00001-benchmark-oauth-github/qwen2-5-coder-32b/editor/assets");
Deno.env.set('SHINKAI_OAUTH', JSON.stringify([]));


const question = "Why is the sky blue?"
const statements: SmartSearchStatement[] = [
  {
    "sourceId": 1,
    "sourceTitle": "Rayleigh scattering - Wikipedia",
    "extractedFacts": [
      {
        "statement": "Rayleigh scattering causes the blue color of the daytime sky and the reddening of the Sun at sunset.",
        "relevance": "DIRECT_ANSWER"
      },
      {
        "statement": "The strong wavelength dependence of the Rayleigh scattering (~λ−4) means that shorter (blue) wavelengths are scattered more strongly than longer (red) wavelengths.",
        "relevance": "HIGHLY_RELEVANT"
      },
      {
        "statement": "The blue color of the sky is a consequence of three factors: the blackbody spectrum of sunlight coming into the Earth's atmosphere, Rayleigh scattering of that light off oxygen and nitrogen molecules, and the response of the human visual system.",
        "relevance": "HIGHLY_RELEVANT"
      },
      {
        "statement": "Due to Rayleigh scattering, red and orange colors are more visible during sunset because the blue and violet light has been scattered out of the direct path.",
        "relevance": "SOMEWHAT_RELEVANT"
      },
      {
        "statement": "The human eye responds to this wavelength combination as if it were a combination of blue and white light.",
        "relevance": "SOMEWHAT_RELEVANT"
      }
    ]
  },
  {
    "sourceId": 2,
    "sourceTitle": "Rayleigh sky model - Wikipedia",
    "extractedFacts": [
      {
        "statement": "The same elastic scattering processes cause the sky to be blue.",
        "relevance": "DIRECT_ANSWER"
      },
      {
        "statement": "The Rayleigh sky model describes the observed polarization pattern of the daytime sky.",
        "relevance": "HIGHLY_RELEVANT"
      },
      {
        "statement": "Rayleigh scattering of light by air molecules, water, dust, and aerosols causes the sky's light to have a defined polarization pattern.",
        "relevance": "HIGHLY_RELEVANT"
      },
      {
        "statement": "Many animals use the polarization patterns of the sky at twilight and throughout the day as a navigation tool.",
        "relevance": "SOMEWHAT_RELEVANT"
      }
    ]
  },
  {
    "sourceId": 3,
    "sourceTitle": "Diffuse sky radiation - Wikipedia",
    "extractedFacts": [
      {
        "statement": "the sky is blue due to Rayleigh scattering",
        "relevance": "DIRECT_ANSWER"
      },
      {
        "statement": "Earth's atmosphere scatters short-wavelength light more efficiently than that of longer wavelengths. Because its wavelengths are shorter, blue light is more strongly scattered than the longer-wavelength lights, red or green.",
        "relevance": "HIGHLY_RELEVANT"
      },
      {
        "statement": "the color perceived is similar to that presented by a monochromatic blue (at wavelength 474–476 nm) mixed with white light, that is, an unsaturated blue light.",
        "relevance": "HIGHLY_RELEVANT"
      },
      {
        "statement": "Scattering and absorption are major causes of the attenuation of sunlight radiation by the atmosphere.",
        "relevance": "SOMEWHAT_RELEVANT"
      },
      {
        "statement": "At sunrise or sunset, tangentially incident solar rays illuminate clouds with orange to red hues.",
        "relevance": "SOMEWHAT_RELEVANT"
      }
    ]
  },
  {
    "sourceId": 4,
    "sourceTitle": "Tyndall effect - Wikipedia",
    "extractedFacts": [
      {
        "statement": "The sky's color is blue due to Rayleigh scattering instead of Tyndall scattering because the scattering particles are the air molecules, which are much smaller than the wavelengths of visible light.",
        "relevance": "DIRECT_ANSWER"
      },
      {
        "statement": "In that the intensity of the scattered light is inversely proportional to the fourth power of the wavelength, so blue light is scattered much more strongly than red light.",
        "relevance": "HIGHLY_RELEVANT"
      },
      {
        "statement": "When the daytime sky is cloudless, the sky's color is blue due to Rayleigh scattering instead of Tyndall scattering.",
        "relevance": "HIGHLY_RELEVANT"
      }
    ]
  },
  {
    "sourceId": 5,
    "sourceTitle": "Skyglow - Wikipedia",
    "extractedFacts": [
      {
        "statement": "Rayleigh scattering makes the sky appear blue in the daytime; the more aerosols there are, the less blue or whiter the sky appears.",
        "relevance": "DIRECT_ANSWER"
      },
      {
        "statement": "There are two kinds of light scattering that lead to sky glow: scattering from molecules such as N2 and O2 (called Rayleigh scattering), and that from aerosols, described by Mie theory.",
        "relevance": "HIGHLY_RELEVANT"
      },
      {
        "statement": "Rayleigh scattering is much stronger for short-wavelength (blue) light, while scattering from aerosols is less affected by wavelength.",
        "relevance": "HIGHLY_RELEVANT"
      },
      {
        "statement": "In urban areas, aerosol scattering dominates, due to the heavy aerosol loading caused by modern industrial activity, power generation, farming and transportation.",
        "relevance": "SOMEWHAT_RELEVANT"
      }
    ]
  },
  {
    "sourceId": 6,
    "sourceTitle": "Talk:Rayleigh scattering - Wikipedia",
    "extractedFacts": [
      {
        "statement": "Sunlight scattered by gases with very negligible intensity because according to Rayleigh equation the intensity of light is directly proportional to the sixth power of particle's diameter that cause particles of 40 nanometers diameter (2 π r) to be **more than trillion** times more intense than gases ( nitrogen & oxygen ) and much less intense than haze ( about 200 nanometers ).",
        "relevance": "DIRECT_ANSWER"
      },
      {
        "statement": "The article already has a graph showing the integrated scattering from air molecules alone amounts to about 20% of blue light. That's enough to explain why the sky appears blue without needing to invoke dust, ozone, or anything else.",
        "relevance": "HIGHLY_RELEVANT"
      }
    ]
  },
  {
    "sourceId": 7,
    "sourceTitle": "Mie scattering - Wikipedia",
    "extractedFacts": [
      {
        "statement": "The blue colour of the sky results from Rayleigh scattering, as the size of the gas particles in the atmosphere is much smaller than the wavelength of visible light.",
        "relevance": "DIRECT_ANSWER"
      },
      {
        "statement": "Rayleigh scattering is much greater for blue light than for other colours due to its shorter wavelength.",
        "relevance": "HIGHLY_RELEVANT"
      },
      {
        "statement": "As sunlight passes through the atmosphere, its blue component is Rayleigh scattered strongly by atmospheric gases but the longer wavelength (e.g. red/yellow) components are not.",
        "relevance": "HIGHLY_RELEVANT"
      },
      {
        "statement": "During sunrises and sunsets, the effect of Rayleigh scattering on the spectrum of the transmitted light is much greater due to the greater distance the light rays have to travel through the high-density air near the Earth's surface.",
        "relevance": "SOMEWHAT_RELEVANT"
      },
      {
        "statement": "In contrast, the water droplets that make up clouds are of a comparable size to the wavelengths in visible light, and the scattering is described by Mie's model rather than that of Rayleigh.",
        "relevance": "SOMEWHAT_RELEVANT"
      }
    ]
  },
  {
    "sourceId": 8,
    "sourceTitle": "Sky blue - Wikipedia",
    "extractedFacts": [
      {
        "statement": "The sky appears blue due to Rayleigh scattering, which is the scattering of sunlight by the air molecules. Short-wavelength light (blue and violet) is scattered more than long-wavelength light (red). Although violet light is scattered more than blue, our eyes are more sensitive to blue light and the upper atmosphere absorbs some violet light.",
        "relevance": "DIRECT_ANSWER"
      },
      {
        "statement": "Sky blue refers to a collection of shades comparable to that of a clear daytime sky.",
        "relevance": "HIGHLY_RELEVANT"
      },
      {
        "statement": "In clear conditions, the color of the sky is heavily influenced by the amount of dust, pollution, and water vapor in the atmosphere, which can change its appearance.",
        "relevance": "HIGHLY_RELEVANT"
      },
      {
        "statement": "The term 'sky blue' is derived from the perception of the color of the entire sky during the day and is usually referred to a light blue shade.",
        "relevance": "SOMEWHAT_RELEVANT"
      },
      {
        "statement": "Typically, the color of the sky is influenced by various factors such as time of day, atmosphere conditions, and the angle of sunlight.",
        "relevance": "SOMEWHAT_RELEVANT"
      }
    ]
  },
  {
    "sourceId": 9,
    "sourceTitle": "Scattering - Wikipedia",
    "extractedFacts": [
      {
        "statement": "This scattering mechanism is the primary cause of the blue color of the Earth's sky on a clear day, as the shorter blue wavelengths of sunlight passing overhead are more strongly scattered than the longer red wavelengths according to Rayleigh's famous 1/λ4 relation.",
        "relevance": "DIRECT_ANSWER"
      },
      {
        "statement": "Light scattering is one of the two major physical processes that contribute to the visible appearance of most objects, the other being absorption.",
        "relevance": "HIGHLY_RELEVANT"
      },
      {
        "statement": "Surfaces described as white owe their appearance to multiple scattering of light by internal or surface inhomogeneities in the object, for example by the boundaries of transparent microscopic crystals that make up a stone or by the microscopic fibers in a sheet of paper.",
        "relevance": "HIGHLY_RELEVANT"
      },
      {
        "statement": "Rayleigh scattering is a process in which electromagnetic radiation (including light) is scattered by a small spherical volume of variant refractive indexes, such as a particle, bubble, droplet, or even a density fluctuation.",
        "relevance": "SOMEWHAT_RELEVANT"
      },
      {
        "statement": "The apparent blue color of veins in skin is a common example where both spectral absorption and scattering play important and complex roles in the coloration.",
        "relevance": "TANGENTIAL"
      }
    ]
  },
  {
    "sourceId": 10,
    "sourceTitle": "Wikipedia:Reference desk/Archives/Science/2011 November 15 - Wikipedia",
    "extractedFacts": [
      {
        "statement": "A portion of the light coming from the sun scatters off molecules and other small particles in the atmosphere. It is this scattered light that gives the sky its brightness and its color. As previously explained, Rayleigh scattering is inversely proportional to the fourth power of wavelength, so that shorter wavelength violet and blue light will scatter more than the longer wavelengths (yellow and especially red light).",
        "relevance": "DIRECT_ANSWER"
      },
      {
        "statement": "The reddening of sunlight is intensified when the sun is near the horizon, because the volume of air through which sunlight must pass is significantly greater than when the sun is high in the sky.",
        "relevance": "HIGHLY_RELEVANT"
      },
      {
        "statement": "Light isn't \"scattered\" or \"un-scattered\", all of it is scattered, but blue scatters more than orange. The thicker the atmosphere, the more scattering, so through the thicker volume of atmosphere you have to look through to the horizon, the blue is now scattered so much you can't even see it and the orange light is now scattered a \"bit\" so you see more orange than blue.",
        "relevance": "HIGHLY_RELEVANT"
      },
      {
        "statement": "Because air scatters blue more efficiently, at sunset by the time that a light beam reaches you pretty much all of the blue has been scattered and removed from the light beam.",
        "relevance": "HIGHLY_RELEVANT"
      },
      {
        "statement": "Dust in the atmosphere is also significant (you get spectacular sunsets after volcanic eruptions), which is probably scattering (but since dust particles are a lot bigger than nitrogen molecules, they scatter very differently.",
        "relevance": "SOMEWHAT_RELEVANT"
      },
      {
        "statement": "Blue is scattered the most, so that's why the sky is blue.",
        "relevance": "SOMEWHAT_RELEVANT"
      },
      {
        "statement": "If more scattering happens from that beam, the sky becomes orange-red since those are the colors still left in the beam.",
        "relevance": "SOMEWHAT_RELEVANT"
      },
      {
        "statement": "Understanding that the sky appears the color of the light which is scattered \"a bit\" (not the technical term).",
        "relevance": "TANGENTIAL"
      }
    ]
  }
]

const answer = await shinkaiLlmPromptProcessor('text', answerGenerator({ originalQuestion: question, statements, sources: [] }));
console.log(answer.message)

Deno.test("Answer should be a string", () => {
  assert(typeof answer.message === 'string', "Answer should be a string");
});

Deno.test("Answer should contain Rayleigh scattering", () => {
  assert(answer.message.toLowerCase().includes("rayleigh scattering"), "Answer should contain Rayleigh scattering");
});

Deno.test("Answer should contain wavelength", () => {
  assert(answer.message.toLowerCase().includes("wavelength"), "Answer should contain wavelength");
});

