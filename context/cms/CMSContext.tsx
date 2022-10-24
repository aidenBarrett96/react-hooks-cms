import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { ContentEditingScreen } from "../../components/CMS/ContentEditingScreen";
import { RegisterContentElement } from "../../services/CMS/registerContentElement";
import { CMSContentElement } from "../../types/CMS.types";

export interface CMSContextType {
  /** List of registered CMS elements */
  elements: CMSContentElement[];
  /** Function to register a CMS element */
  registerContentElement: (element: CMSContentElement) => void;
  /** Whether the content is currently being edited */
  isEditing: string | null;
  /** The currently edited element */
  currentlyEditingElement: CMSContentElement | null;
  /**
   * Function to start editing content
   *
   * @param id The id of the content to edit
   */
  startEditing: (id: string) => void;
  /** Function to stop editing content */
  stopEditing: () => void;
  /**
   * Function to handle changes on currently edited element
   *
   * @param value The new value of the element
   */
  handleChange: (newValue: string) => void;
  /**
   * Function to watch for changes on a specific element's value
   *
   * @param id The id of the element to watch
   */
  watchElementValue: <ExpectReturn>(id: string) => ExpectReturn;
}

const defaultContext: CMSContextType = {
  elements: [],
  registerContentElement: () => {},
  isEditing: null,
  currentlyEditingElement: null,
  startEditing: () => {},
  stopEditing: () => {},
  handleChange: () => {},
  watchElementValue: function <T>() {
    return "" as T;
  },
};

/**
 * Context for cms related data and managing the content
 */
export const CMSContext = createContext<CMSContextType>(defaultContext);
const { Provider } = CMSContext;

interface CMSProviderProps {
  children?: ReactNode;
}

/**
 * Context providing wrapper for react-hook-cms
 */
export const CMSProvider = ({ children }: CMSProviderProps) => {
  const [elements, setElements] = useState<CMSContentElement[]>([]);

  const [isEditing, setIsEditing] = useState<string | null>(null);

  const [currentlyEditingElement, setCurrentlyEditingElement] =
    useState<CMSContentElement | null>(null);

  const startEditing = useCallback(
    (id: string) => {
      const targetElement = elements.find((element) => element.id === id);

      if (!targetElement) {
        throw new Error(`No element with id "${id}" found`);
      }

      setIsEditing(id);
      setCurrentlyEditingElement(targetElement);
    },
    [elements, setIsEditing]
  );

  const stopEditing = useCallback(() => {
    setIsEditing(null);
  }, [setIsEditing]);

  const registerContentElement = useCallback(
    (element: CMSContentElement) => {
      setElements((prevElements) => [...prevElements, element]);
    },
    [setElements]
  );

  const handleChange = useCallback(
    (newValue: string) => {
      if (!currentlyEditingElement) return;

      setElements((prevElements) => {
        const newElements = [...prevElements];

        const targetElementIndex = newElements.findIndex(
          (element) => element.id === currentlyEditingElement.id
        );

        newElements[targetElementIndex].value = newValue;

        return newElements;
      });
    },

    [currentlyEditingElement]
  );

  const watchElementValue = useCallback(
    function <ExpectReturn>(id: string): ExpectReturn {
      const targetElement = elements.find((element) => element.id === id);

      return targetElement?.value;
    },
    [elements]
  );

  const contextValue = useMemo<CMSContextType>(
    () => ({
      elements,
      registerContentElement,
      isEditing,
      currentlyEditingElement,
      startEditing,
      stopEditing,
      handleChange,
      watchElementValue,
    }),
    [
      currentlyEditingElement,
      elements,
      isEditing,
      registerContentElement,
      startEditing,
      stopEditing,
      handleChange,
      watchElementValue,
    ]
  );

  return (
    <Provider value={contextValue}>
      {children}
      <ContentEditingScreen />
    </Provider>
  );
};

/**
 * Simple hook to interact with cms context
 * @returns
 */
export const useCMS = () => useContext(CMSContext);
