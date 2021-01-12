using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace PinaryDevelopment.TorahIsLife.Functions
{
    public static class ModelBinder
    {
        private static readonly Type StringType = typeof(string);
        private static readonly Type IntType = typeof(int);
        private static readonly Type LongType = typeof(long);
        private static readonly Type DateTimeType = typeof(DateTime);
        private static readonly Type GuidType = typeof(Guid);

        public static T BindModel<T>(this T t, IDictionary<string, string> propertyNameValueDictionary)
        {
            propertyNameValueDictionary = propertyNameValueDictionary.ToDictionary(k => k.Key, v => v.Value, StringComparer.InvariantCultureIgnoreCase);
            foreach (var property in t.GetType().GetProperties().Where(prop => propertyNameValueDictionary.ContainsKey(prop.Name)))
            {
                var stringVal = propertyNameValueDictionary[property.Name];
                var underlyingValType = Nullable.GetUnderlyingType(property.PropertyType);
                if (property.PropertyType == StringType)
                {
                    property.SetValue(t, stringVal);
                }
                else if (property.PropertyType == IntType || (underlyingValType != null && underlyingValType == IntType))
                {
                    property.SetValue(t, int.Parse(stringVal, CultureInfo.InvariantCulture));
                }
                else if (property.PropertyType == LongType || (underlyingValType != null && underlyingValType == LongType))
                {
                    property.SetValue(t, long.Parse(stringVal, CultureInfo.InvariantCulture));
                }
                else if (property.PropertyType == DateTimeType || (underlyingValType != null && underlyingValType == DateTimeType))
                {
                    property.SetValue(t, DateTime.Parse(stringVal, CultureInfo.InvariantCulture));
                }
                else if (property.PropertyType == GuidType || (underlyingValType != null && underlyingValType == GuidType))
                {
                    property.SetValue(t, Guid.Parse(stringVal));
                }
                else if (property.PropertyType.IsArray)
                {
                    var values = stringVal.Split(',');
                    if (IntType.IsAssignableFrom(property.PropertyType.GetElementType()))
                    {
                        property.SetValue(t, values.Select(value => int.Parse(value, CultureInfo.InvariantCulture)).ToArray());
                    }
                    else if (LongType.IsAssignableFrom(property.PropertyType.GetElementType()))
                    {
                        property.SetValue(t, values.Select(value => long.Parse(value, CultureInfo.InvariantCulture)).ToArray());
                    }
                    else if (GuidType.IsAssignableFrom(property.PropertyType.GetElementType()))
                    {
                        property.SetValue(t, values.Select(value => Guid.Parse(value)).ToArray());
                    }
                }
            }

            return t;
        }

        public static T2 Map<T1, T2>(this T1 t1) where T2 : new()
        {
            var t2 = new T2();
            var t1Properties = typeof(T1).GetProperties();
            var t1PropertyNames = t1Properties.Select(prop => prop.Name);
            foreach (var property in t2.GetType().GetProperties().Where(prop => t1PropertyNames.Contains(prop.Name)))
            {
                var value = t1Properties.First(prop => prop.Name == property.Name).GetValue(t1);
                property.SetValue(t2, value);
            }

            return t2;
        }
    }
}
