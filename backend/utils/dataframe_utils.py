import pandas as pd

def concatenate_with_index_check(df1, df2):
    """
    Concatenate two DataFrames with index check and reset.
    """
    if not df1.index.equals(df2.index):
        df1.reset_index(drop=True, inplace=True)
        df2.reset_index(drop=True, inplace=True)
    return pd.concat([df1, df2], axis=1)
