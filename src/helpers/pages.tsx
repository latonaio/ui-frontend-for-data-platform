import { Dispatch, SetStateAction } from 'react';

interface list {
  keyName: string,
  keyType: 'select' | 'datePicker',
  currentValue?: any;
  select?: {
    data: any;
    label: string;
    value: string;
  }
}

type ListValue = {
  currentValue: any;
  select?: {
    data: any;
    label: string | undefined;
    value: string | undefined;
  }
};

const createObject = (list: list): ListValue => {
  if (list.keyType === 'select') {
    return {
      currentValue: list.currentValue || null,
      select: {
        data: list.select?.data,
        label: list.select?.label,
        value: list.select?.value,
      }
    };
  } else if (list.keyType === 'datePicker') {
    return { currentValue: list.currentValue };
  }

  return { currentValue: list.currentValue };
};

export const createFormDataForSelectObject = (
  formDataForSelect: list[],
): {
  [key: string]: ListValue;
} => {
  return formDataForSelect.reduce((collection: any, item: list) => {
    collection[item.keyName] = createObject(item);

    return collection;
  }, {});
};

interface editList {
  keyName: string;
  valueName?: string;
}

export const createFormDataForEditingArray = (
  list: any[],
  editList: editList[],
): { isEditing: boolean; }[] => {
  return editList.reduce((collection: any, item: editList, currentIndex: number) => {
    collection[item.keyName] = [
      ...Array.from({
        length: list.length
      }, (element, index) => {
        return { isEditing: false };
      })
    ];

    return collection;
  }, {});
};

export const createFormDataForKeyNameEditingArray = (
  list: any[],
  keyName: string,
  editListKeyNames: editList[],
  indexKeyName: string,
): any => {
  return list.reduce((collection: any, item: any, currentIndex: number) => {
    const l = editListKeyNames.reduce((c: any, editListKeyName) => {
      c[editListKeyName.keyName] = { isEditing: false };

      return c;
    }, {});

    collection[item[indexKeyName]] = {
      ...l,
    }

    return collection;
  }, {});
};

interface EditListFormData {
  [key: string]: any;
  editList: {
    [key: string]: {
      isEditing: boolean;
    }[];
  };
}

export const createEditFormData = (
  formData: any,
  setFormData: Dispatch<SetStateAction<EditListFormData>>,
  editListIndex: number,
  editListKey: string,
  isClose: boolean = false,
): void => {
  const editFormData = {
    ...formData,
    editList: {
      ...formData.editList,
      [editListKey]: [
        ...formData.editList[editListKey].map((item: any, index: number) => {
          return {
            isEditing: (() => {
              if (isClose) { return false; }

              return index === editListIndex ? !item.isEditing : item.isEditing;
            })()
          }
        })
      ]
    }
  };

  setFormData(editFormData);
}

export const getSearchTextDescription = (
  userType: string,
  enumTypes: any,
) => {
  return `User=${enumTypes[userType]}を選択しています`;
};
