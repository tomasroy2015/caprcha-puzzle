using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CaptchaAPI
{
    public static class Extension {  
     public static IList<T> TakeRandom<T>(
    this IEnumerable<T> source, int count, Random random)
    {
        var list = new List<T>(count);
        int n = 1;
        foreach (var item in source)
        {
            if (list.Count < count)
            {
                list.Add(item);
            }
            else
            {
                int j = random.Next(n);
                if (j < count)
                {
                    list[j] = item;
                }
            }
            n++;
        }
        return list;
    }
      public static  void Shuffle<T>(this IList<T> list, Random random)
        {
            for (int i = 0; i < list.Count; i++)
            {
                int j = random.Next(i, list.Count);
                T temp = list[j];
                list[j] = list[i];
                list[i] = temp;
            }
        }
    }

}